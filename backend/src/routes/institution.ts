import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth';
import { uploadCertificate } from '../controllers/institutionController';

const router = express.Router();

const upload = multer({ dest: 'uploads/', limits: { fileSize: 20 * 1024 * 1024 } });
import { uploadCertificateSchema } from '../validators/upload';
import { Request, Response, NextFunction } from 'express';

function validateForm(schema:any){
  return (req: Request, res: Response, next: NextFunction)=>{
    try{ schema.parse(req.body); next(); }catch(e:any){ res.status(400).json({ error: 'Validation failed', details: e.errors }); }
  }
}

// Only INSTITUTION_ADMIN or INSTITUTION_OFFICER can upload
router.post('/certificates/upload', requireAuth(['INSTITUTION_ADMIN','INSTITUTION_OFFICER']), upload.single('file'), validateForm(uploadCertificateSchema), uploadCertificate);

router.get('/certificates', requireAuth(['INSTITUTION_ADMIN','INSTITUTION_OFFICER']), async (req, res) => {
  // list by institutionId (user sub)
  const institutionId = (req as any).user.sub;
  const prisma = (await import('../prisma')).default;
  const certs = await prisma.certificate.findMany({ where: { institutionId } });
  res.json(certs);
});

// Search students by name or SEID for the institution (used when issuing)
router.get('/students', requireAuth(['INSTITUTION_ADMIN','INSTITUTION_OFFICER']), async (req, res) => {
  const q = (req.query.q as string) || '';
  const prisma = (await import('../prisma')).default;
  const students = await prisma.student.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { seid: { contains: q } }
      ]
    },
    take: 20
  });
  res.json({ students });
});

export default router;
