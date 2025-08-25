/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { api } from '../utils/api.js';
import { toast } from 'react-toastify';
import JobList from '../components/job/JobList.jsx';
import Loader from '../components/ui/Loader.jsx';
import { Link } from 'react-router-dom';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs?employer=true');
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch jobs');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Posted Jobs</h1>
      <Link to="/post-job" className="bg-blue-600 text-white p-2 rounded mb-4 inline-block">
        Post New Job
      </Link>
      <JobList jobs={jobs} loading={loading} />
    </div>
  );
}

export default MyJobs;