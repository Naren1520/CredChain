import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { JwtPayload as JwtPayloadType } from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

export type JwtPayload = { sub: string; role: string } & jwt.JwtPayload;

export function requireAuth(roles?: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Missing auth' });
    const token = auth.replace(/^Bearer\s+/, '');
    try {
      const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
      if (roles && !roles.includes(payload.role)) return res.status(403).json({ error: 'Forbidden' });
      // attach
      (req as any).user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
