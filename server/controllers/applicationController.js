import Application from '../models/Application.js';
import Job from '../models/Job.js';

export const applyJob = async (req, res) => {
  const { jobId, coverLetter } = req.body;
  const resume = req.file.path;
  try {
    const job = await Job.findByPk(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    const application = await Application.create({ resume, coverLetter, jobId, userId: req.user.id });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({
      where: { userId: req.user.id },
      include: ['job']
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};