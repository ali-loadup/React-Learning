import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";
import { BASE_API_URL } from "../lib/constant";
import { Job } from "../models/job";

type DataContextType = {
  searchText: string;
  setSearchText: (text: string) => void;
  getData: (searchText: string) => Promise<void>;
  jobs: Job[];
};

export const DataContext = createContext<DataContextType | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);

  const getData = async (searchText: string) => {
    setSearchText(searchText);

    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setJobs(data.jobItems);
    console.log("Data fetched:", data);
  };

  return (
    <DataContext.Provider
      value={{
        searchText,
        setSearchText,
        getData,
        jobs,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("getDataContext must be used within a DataContextProvider");
  }
  return context;
}
