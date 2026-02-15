import { Request, Response } from 'express';
import prisma from '../prisma';
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
  
  // Hardcoded test credentials (works without database)
  const testCredentials = [
    { email: 'test@demo.org', password: 'test123' },
    { email: 'admin@demo.org', password: 'admin123' },
    { email: 'officer@demo.org', password: 'password123' }
  ];
  
  const testUser = testCredentials.find(u => u.email === email && u.password === password);
  if (testUser) {
    // Generate tokens for test user
    const testInstitutionId = 'test-institution-' + email.split('@')[0];
    const access = signAccess({ sub: testInstitutionId, role: 'INSTITUTION_ADMIN', uid: 'test-user-' + email });
    const refresh = signRefresh({ sub: testInstitutionId, role: 'INSTITUTION_ADMIN', uid: 'test-user-' + email });
    return res.json({ access, refresh });
  }
  
  // Check database credentials (from seed)
  const user = await prisma.institutionUser.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid' });

  const access = signAccess({ sub: user.institutionId, role: user.role, uid: user.id });
  const refresh = signRefresh({ sub: user.institutionId, role: user.role, uid: user.id });

  // store refresh
  await prisma.refreshToken.create({ data: { token: refresh, institutionUserId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000) } });

  // audit
  try { await import('../middleware/audit').then(m => m.audit('institution_login', req, { email })); } catch(e){}
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
