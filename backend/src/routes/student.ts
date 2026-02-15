import express from 'express';
import prisma from '../prisma';
import { requireAuth } from '../middleware/auth';
import crypto from 'crypto';

const router = express.Router();

router.get('/certificates', requireAuth(['STUDENT','INSTITUTION_ADMIN','INSTITUTION_OFFICER']), async (req, res) => {
  const sub = (req as any).user.sub; // for student sub is studentId, for institutions it's institutionId
  const role = (req as any).user.role;
  let certs;
  if (role === 'STUDENT') {
    certs = await prisma.certificate.findMany({ where: { studentId: sub } });
  } else {
    certs = await prisma.certificate.findMany({ where: { institutionId: sub } });
  }
  res.json(certs);
});

router.post('/certificates/:id/generate-verification-token', requireAuth(['STUDENT','INSTITUTION_ADMIN','INSTITUTION_OFFICER']), async (req, res) => {
  const { id } = req.params;
  const token = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000);
  await prisma.verificationToken.create({ data: { token, certificateId: id, expiresAt } });
  res.json({ token });
});

export default router;
