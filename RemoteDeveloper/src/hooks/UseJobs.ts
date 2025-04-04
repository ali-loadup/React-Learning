import { useQueries } from "@tanstack/react-query";
import { fetchJobSingleJob } from "./UseSingleJob";
import { handleError } from "../utils/errorHandler";

export default function useJobs(jobIds: number[]) {
  const result = useQueries({
    queries: jobIds.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => {
        return fetchJobSingleJob(id);
      },
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
      onError: handleError,
    })),
  });

  const jobs = result
    .map((item) => {
      return item.data?.jobItem;
    })
    .filter((item) => item !== undefined);

  const isLoading = result.some((item) => item.isLoading);

  return { jobs, isLoading };
}
