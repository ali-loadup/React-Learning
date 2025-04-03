import { BASE_API_URL } from "../lib/constant";
import { Job } from "../models/job";
import { useQuery } from "@tanstack/react-query";

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
    throw new Error("Network response was not ok");
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
      onError: () => {},
    }
  );

  const jobs = data?.jobItems || [];
  const isLoading = isInitialLoading;
  return [jobs, isLoading] as const;
}
