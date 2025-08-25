import { useState } from 'react';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function JobForm({ job = {} }) {
  const [title, setTitle] = useState(job.title || '');
  const [description, setDescription] = useState(job.description || '');
  const [location, setLocation] = useState(job.location || '');
  const [salary, setSalary] = useState(job.salary || '');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { title, description, location, salary };
      if (job.id) {
        await api.put(`/jobs/${job.id}`, data);
        toast.success('Job updated successfully');
      } else {
        await api.post('/jobs', data);
        toast.success('Job posted successfully');
      }
      navigate('/my-jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="mt-1 w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {job.id ? 'Update Job' : 'Post Job'}
      </button>
    </form>
  );
}

export default JobForm;