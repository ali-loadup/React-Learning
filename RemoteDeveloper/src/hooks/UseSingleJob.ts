import React, { useEffect } from "react";
import { BASE_API_URL } from "../lib/constant";
import { JobExpanded } from "../models/jobExpanded";

export default function useSingleJob(id: number) {
  const [jobItem, setJobItem] = React.useState<JobExpanded | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const getData = async () => {
      console.warn("getData called with ID:", id);

      const response = await fetch(`${BASE_API_URL}/${id}`);

      setIsLoading(false);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setJobItem(data.jobItem);
      console.log("Active Job:", data.jobItem);
    };
    getData();
  }, [id]);

  return { jobItem, isLoading };
}
