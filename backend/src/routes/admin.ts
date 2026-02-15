import express from 'express';
import { requireAuth } from '../middleware/auth';
import { approveInstitution, suspendInstitution, whitelistWallet } from '../controllers/adminController';

const router = express.Router();

router.post('/institutions/approve', requireAuth(['GOV_ADMIN']), approveInstitution);
router.post('/institutions/suspend', requireAuth(['GOV_ADMIN']), suspendInstitution);
router.post('/institutions/whitelist-wallet', requireAuth(['GOV_ADMIN']), whitelistWallet);

export default router;
