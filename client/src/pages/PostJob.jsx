import JobForm from '../components/job/JobForm.jsx';

function PostJob() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Post a Job</h1>
      <JobForm />
    </div>
  );
}

export default PostJob;