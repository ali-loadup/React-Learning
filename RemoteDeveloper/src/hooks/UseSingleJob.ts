import { useQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../lib/constant";
import { JobExpanded } from "../models/jobExpanded";
import { handleError } from "../utils/errorHandler";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobExpanded;
};

const fetchJobSingleJob = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export default function useSingleJob(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobSingleJob(id) : null),
    {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError,
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading };
}
