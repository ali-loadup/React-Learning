import { useDispatch, useSelector } from "react-redux";
import JobList from "./JobList";
import { useEffect, useState } from "react";
import { RootState } from "../state/rootReducer";
import { AppDispatch } from "../state/store";
import { Job } from "../models/job";

export default function JobListSearch() {
  const jobs = useSelector((state: RootState) => state.job.jobs);

  const dispatch = useDispatch<AppDispatch>();
  const [jobItemsSortedAndSliced, setJobs] = useState<Job[]>([]);
  const sortBy = useSelector((state: RootState) => state.jobSeacrh.sortBy);
  const currentPage = useSelector(
    (state: RootState) => state.jobSeacrh.currentPage
  );

  useEffect(() => {
    const sortedJobs = [...(jobs || [])].sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      }
      if (sortBy === "recent") {
        return a.daysAgo - b.daysAgo;
      }
      return 0;
    });

    const slicedJobs = sortedJobs.slice(
      (currentPage - 1) * 7,
      (currentPage - 1) * 7 + 7
    );

    setJobs(slicedJobs);
  }, [dispatch, jobs, sortBy, currentPage]);

  const isLoading = useSelector(
    (state: RootState) => state.ui.isLoadingForJobsList
  );

  return <JobList jobs={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
