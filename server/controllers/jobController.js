import Job from '../models/Job.js';
import { Op } from 'sequelize';

export const getJobs = async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  try {
    const jobs = await Job.findAndCountAll({
      where: { title: { [Op.like]: `%${search}%` } },
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      include: ['employer']
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, { include: ['employer'] });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;
  try {
    const job = await Job.create({ title, description, location, salary, employerId: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job || job.employerId !== req.user.id) return res.status(403).json({ message: 'Access denied' });
    await job.update(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job || job.employerId !== req.user.id) return res.status(403).json({ message: 'Access denied' });
    await job.destroy();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};