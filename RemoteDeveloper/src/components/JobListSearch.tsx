import { useJobItemsContext } from "../context/jobItemsContextProvider";
import JobList from "./JobList";

export default function JobListSearch() {
  const { isLoading, jobItemsSortedAndSliced } = useJobItemsContext();

  return <JobList jobs={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
