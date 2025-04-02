import { useEffect, useState } from "react";
import { BASE_API_URL } from "../lib/constant";
import { Job } from "../models/job";

export default function useJobs(searchText: string) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!searchText) return;

    const getData = async () => {
      console.warn("getData called with searchText:", searchText);

      setIsLoading(true);
      let url = BASE_API_URL;
      if (searchText.length > 0) url += `?search=${searchText}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsLoading(false);
      const data = await response.json();
      
      setJobs(data.jobItems.slice(0, 7)); 
    };

    getData();
  }, [searchText]);

  return { jobs, isLoading };
}
