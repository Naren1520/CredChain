import { Request, Response } from 'express';
import prisma from '../prisma';
import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';
import { BlockchainService } from '../services/blockchain';

const uploadsDir = path.join(process.cwd(), 'uploads');

export async function uploadCertificate(req: Request, res: Response) {
  try {
    const file = req.file;
    const body = req.body;
    if (!file) return res.status(400).json({ error: 'No file' });

    const metadata = JSON.parse(body.meta || '{}');

    // canonicalize metadata
    const canonical = canonicalize(metadata);

    const fileBytes = await fs.readFile(file.path);
    const hash = crypto.createHash('sha256').update(Buffer.concat([fileBytes, Buffer.from(canonical)])).digest('hex');

    // create certificateId
    const certificateId = body.certificateId || crypto.randomBytes(8).toString('hex');

    // call blockchain
    const rpc = process.env.RPC_URL!;
    const pk = process.env.PRIVATE_KEY!;
    const contractAddr = process.env.CONTRACT_ADDRESS;
    const bc = new BlockchainService(rpc, pk, contractAddr);
    const { txHash } = await bc.issueCertificate(certificateId, '0x' + hash);

    // resolve studentId: allow passing Student.id (uuid) or SEID
    let studentId = body.studentId;
    const isUuid = typeof studentId === 'string' && /^[0-9a-fA-F-]{36}$/.test(studentId);
    if (!isUuid) {
      // try lookup by SEID
      const found = await prisma.student.findUnique({ where: { seid: studentId } });
      if (!found) return res.status(400).json({ error: 'Student not found by SEID' });
      studentId = found.id;
    }

    // save DB record
    const cert = await prisma.certificate.create({
      data: {
        certificateId,
        studentId,
        institutionId: (req as any).user.sub,
        type: body.type || 'DEGREE',
        filePath: file.path,
        metaJson: metadata,
        pdfHash: hash,
        chainHash: '0x' + hash,
        txHash,
        chainNetwork: 'sepolia',
        issuedAt: new Date()
      }
    });
    // audit
    try { await import('../middleware/audit').then(m => m.audit('upload_certificate', req, { certificateId, institutionId: (req as any).user.sub })); } catch(e){}

    return res.json({ ok: true, cert });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

function canonicalize(obj: any): string {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return '[' + obj.map(canonicalize).join(',') + ']';
  const keys = Object.keys(obj).sort();
  return '{' + keys.map(k => JSON.stringify(k) + ':' + canonicalize(obj[k])).join(',') + '}';
}
