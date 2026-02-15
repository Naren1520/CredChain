import express from 'express';
import prisma from '../prisma';
import { BlockchainService } from '../services/blockchain';

const router = express.Router();

router.get('/certificate/:certificateId', async (req, res) => {
  const { certificateId } = req.params;
  const cert = await prisma.certificate.findUnique({ where: { certificateId } });
  if (!cert) return res.status(404).json({ error: 'Not found' });

  // verify on chain
  const rpc = process.env.RPC_URL!;
  const pk = process.env.PRIVATE_KEY!;
  const contractAddr = process.env.CONTRACT_ADDRESS!;
  const bc = new BlockchainService(rpc, pk, contractAddr);
  const onChain = await bc.getCertificate(certificateId);
  const chainHash = onChain[0] as string;
  const verified = chainHash && chainHash.toLowerCase().includes((cert.chainHash || '').replace(/^0x/, '').toLowerCase());

  return res.json({ certificate: cert, verified, chain: { txHash: cert.txHash } });
});

router.get('/token/:token', async (req, res) => {
  const { token } = req.params;
  const vt = await prisma.verificationToken.findUnique({ where: { token } });
  if (!vt) return res.status(404).json({ error: 'Not found' });
  if (vt.expiresAt < new Date()) return res.status(410).json({ error: 'Expired' });
  const cert = await prisma.certificate.findUnique({ where: { certificateId: vt.certificateId } });
  if (!cert) return res.status(404).json({ error: 'Certificate not found' });

  const rpc = process.env.RPC_URL!;
  const pk = process.env.PRIVATE_KEY!;
  const contractAddr = process.env.CONTRACT_ADDRESS!;
  const bc = new BlockchainService(rpc, pk, contractAddr);
  const onChain = await bc.getCertificate(cert.certificateId);
  const chainHash = onChain[0] as string;
  const verified = chainHash && chainHash.toLowerCase().includes((cert.chainHash || '').replace(/^0x/, '').toLowerCase());

  return res.json({ certificate: cert, verified });
});

export default router;
