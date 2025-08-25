/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/ui/Loader.jsx';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch job details');
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error('Please upload a resume');
      return;
    }
    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);

    try {
      await api.post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('Application submitted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) return <Loader />;
  if (!job) return <p>Job not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{job.title}</h1>
      <p className="text-gray-600">Posted by: {job.User.name}</p>
      <p className="text-gray-600">Location: {job.location}</p>
      <p className="text-gray-600">Salary: {job.salary || 'Not disclosed'}</p>
      <p className="mt-4">{job.description}</p>
      {user && user.role === 'job_seeker' && (
        <form onSubmit={handleApply} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium">Cover Letter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
}

export default JobDetails;