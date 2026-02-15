import { z } from 'zod';

export const uploadCertificateSchema = z.object({
  studentId: z.string().uuid(),
  type: z.string().min(2),
  certificateId: z.string().optional(),
  meta: z.string().optional()
});
