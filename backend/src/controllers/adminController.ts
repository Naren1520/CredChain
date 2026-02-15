import { Request, Response } from 'express';
import prisma from '../prisma';
import { BlockchainService } from '../services/blockchain';

export async function approveInstitution(req: Request, res: Response) {
  const { institutionId } = req.body;
  const inst = await prisma.institution.update({ where: { id: institutionId }, data: { status: 'APPROVED' } });
  res.json({ ok: true, inst });
}

export async function suspendInstitution(req: Request, res: Response) {
  const { institutionId } = req.body;
  const inst = await prisma.institution.update({ where: { id: institutionId }, data: { status: 'SUSPENDED' } });
  res.json({ ok: true, inst });
}

export async function whitelistWallet(req: Request, res: Response) {
  const { institutionId, wallet, allowed } = req.body;
  const inst = await prisma.institution.findUnique({ where: { id: institutionId } });
  if (!inst) return res.status(404).json({ error: 'Not found' });

  // update DB
  await prisma.institution.update({ where: { id: institutionId }, data: { wallet } });

  // call blockchain
  const rpc = process.env.RPC_URL!;
  const pk = process.env.PRIVATE_KEY!;
  const contractAddr = process.env.CONTRACT_ADDRESS!;
  const bc = new BlockchainService(rpc, pk, contractAddr);
  const result = await bc.setIssuer(wallet, !!allowed);

  res.json({ ok: true, result });
  try { await import('../middleware/audit').then(m => m.audit('whitelist_wallet', req, { institutionId, wallet, allowed })); } catch(e){}
}
