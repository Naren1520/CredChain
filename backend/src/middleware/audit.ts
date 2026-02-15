import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';

export async function audit(action: string, req: Request, metadata?: any) {
  try {
    const actor = (req as any).user;
    await prisma.auditLog.create({ data: {
      action,
      actorId: actor?.uid || actor?.sub || null,
      actorRole: actor?.role || null,
      ip: req.ip,
      metadata: metadata ? metadata : undefined
    }});
  } catch (e) {
    // do not block flow on audit failures
    console.error('Audit log failed', e);
  }
}

export function auditMiddleware(action: string, metadataFactory?: (req: Request)=>any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await audit(action, req, metadataFactory ? metadataFactory(req) : undefined);
    } catch(e){}
    next();
  };
}
