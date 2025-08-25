import { useState } from 'react';
import JobList from '../components/job/JobList.jsx';
import JobSearch from '../components/job/JobSearch.jsx';
import { useFetchJobs } from '../hooks/useFetchJobs';

function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { jobs, totalPages, loading } = useFetchJobs(page, search);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
      <JobSearch setSearch={setSearch} />
      <JobList jobs={jobs} loading={loading} />
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;