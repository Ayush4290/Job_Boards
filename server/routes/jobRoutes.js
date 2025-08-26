import express from 'express';
import auth from '../middleware/auth.js';
import role from '../middleware/role.js';
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobController.js';

const jobRoutes = express.Router();

jobRoutes.get('/', getJobs);
jobRoutes.get('/:id', getJob);
jobRoutes.post('/', auth, role('employer'), createJob);
jobRoutes.put('/:id', auth, role('employer'), updateJob);
jobRoutes.delete('/:id', auth, role('employer'), deleteJob);

export default jobRoutes;