/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { api } from '../utils/api.js';
import { toast } from 'react-toastify';

export const useFetchJobs = (page, search) => {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs?page=${page}&search=${search}`);
        setJobs(res.data.jobs);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        toast.error('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [page, search]);

  return { jobs, totalPages, loading };
};