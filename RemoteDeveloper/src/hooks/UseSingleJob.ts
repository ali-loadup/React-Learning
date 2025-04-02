import React, { useEffect } from 'react'
import { BASE_API_URL } from '../lib/constant';
import { JobExpanded } from '../models/jobExpanded';

export default function useSingleJob(id : number) {
  const [jobItem, setJobItem] = React.useState<JobExpanded|null>(null);

  useEffect(() => {
    if (!id) return;
  
      console.log("Active ID changed:", id);
  
      const getData = async () => {
        console.warn("getData called with ID:", id);
  
        const response = await fetch(`${BASE_API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setJobItem(data.jobItem);
        console.log("Active Job:", data.jobItem);
      };
      getData();
    },[id]);

    return jobItem;
  
}
