import JobCard from './JobCard.jsx';
import Loader from '../ui/Loader.jsx';

function JobList({ jobs, loading }) {
  if (loading) return <Loader />;
  if (!jobs.length) return <p>No jobs found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;