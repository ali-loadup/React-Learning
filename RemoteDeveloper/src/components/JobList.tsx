import { useDataContext } from "../context/DataContextProvider";
import JobListItem from "./JobListItem";

export function JobList() {
  const { jobs } = useDataContext();

  return (
    <ul className="job-list">
      {jobs?.map((job) => (
        <JobListItem key={job.id} job={job}></JobListItem>
      ))}
    </ul>
  );
}

export default JobList;
