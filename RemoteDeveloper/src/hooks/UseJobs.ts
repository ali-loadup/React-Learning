import { BASE_API_URL } from "../lib/constant";
import { Job } from "../models/job";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "../utils/errorHandler";

type getJobsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: Job[];
};

const getData = async (searchText: string): Promise<getJobsApiResponse> => {
  let url = BASE_API_URL;
  if (searchText.length > 0) url += `?search=${searchText}`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();

  return data;
};

export default function useJobs(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["jobs-list", searchText],
    () => (searchText.length > 0 ? getData(searchText) : null),
    {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!searchText,
      onError: handleError,
    }
  );

  const jobs = data?.jobItems || [];
  const isLoading = isInitialLoading;
  return [jobs, isLoading] as const;
}
