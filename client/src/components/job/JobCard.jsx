import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-gray-600">{job.User.name}</p>
      <p className="text-gray-600">{job.location}</p>
      <p className="text-gray-600">{job.salary || 'Salary not disclosed'}</p>
      <Link to={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  );
}

export default JobCard;