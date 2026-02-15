import express from 'express';
import { institutionLogin, refreshToken, logout } from '../controllers/authController';
import { institutionLoginSchema } from '../validators/auth';
import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

function validate(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (e: any) {
			res.status(400).json({ error: 'Validation failed', details: e.errors });
		}
	};
}

const router = express.Router();

router.post('/institution/login', validate(institutionLoginSchema), institutionLogin);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
