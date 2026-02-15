import { Request, Response } from 'express';
import prisma from '../prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshdev';

function signAccess(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

function signRefresh(payload: any) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

export async function institutionLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await prisma.institutionUser.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });

  const access = signAccess({ sub: user.institutionId, role: user.role, uid: user.id });
  const refresh = signRefresh({ sub: user.institutionId, role: user.role, uid: user.id });

  // store refresh
  await prisma.refreshToken.create({ data: { token: refresh, institutionUserId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) } });

  // audit
  try { await import('../middleware/audit.js').then(m => m.audit('institution_login', req, { email })); } catch(e){}
  res.json({ access, refresh });
}

export async function refreshToken(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing' });
  try {
    const payload: any = jwt.verify(token, REFRESH_SECRET);
    // check stored
    const stored = await prisma.refreshToken.findUnique({ where: { token } });
    if (!stored) return res.status(401).json({ error: 'Invalid' });
    const access = signAccess({ sub: payload.sub, role: payload.role, uid: payload.uid });
    res.json({ access });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid' });
  }
}

export async function logout(req: Request, res: Response) {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Missing' });
  await prisma.refreshToken.deleteMany({ where: { token } });
  res.json({ ok: true });
}
