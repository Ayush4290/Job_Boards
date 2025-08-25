/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { toast } from 'react-toastify';
import Loader from '../components/ui/Loader.jsx';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/applications');
        setApplications(res.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch applications');
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <Loader />;
  if (!applications.length) return <p>No applications found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{app.Job.title}</h3>
            <p className="text-gray-600">Company: {app.Job.User.name}</p>
            <p className="text-gray-600">Resume: <a href={app.resume} className="text-blue-600" target="_blank">View</a></p>
            <p className="text-gray-600">Cover Letter: {app.coverLetter || 'Not provided'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;