import express from 'express';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import { applyJob, getApplications } from '../controllers/applicationController.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/', auth, role('job_seeker'), upload.single('resume'), applyJob);
router.get('/', auth, role('job_seeker'), getApplications);

export default router;