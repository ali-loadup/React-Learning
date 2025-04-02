import { Job } from "../models/job";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobs: Job[];
  isLoading: boolean;
};

export function JobList({ jobs, isLoading }: JobListProps) {
  return (
    <>
      <ul className="job-list">
        {isLoading == true ? (
          <Spinner />
        ) : (
          jobs?.map((job) => <JobListItem key={job.id} job={job}></JobListItem>)
        )}
      </ul>
    </>
  );
}

export default JobList;
