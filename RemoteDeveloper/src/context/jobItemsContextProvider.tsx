import React, { createContext, useContext, useState, ReactNode } from "react";
import { Job } from "../models/job";
import { RESULTS_PER_PAGE } from "../lib/constant";
import { PaginationDirection } from "../types/paginationDirection";
import { SortBy } from "../types/sortBy";
import useSearchInJobs from "../hooks/UseSearchInJobs";
import { useSearchTextContext } from "./searchTextContextProvider";

type JobItemsContextType = {
  jobs: Job[] | undefined;
  jobItemsSortedAndSliced: Job[];
  isLoading: boolean;
  totalCountOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handlechangePage: (direction: PaginationDirection) => void;
  handleChangeSort: (sortBy: SortBy) => void;
};

const JobItemsContext = createContext<JobItemsContextType | null>(null);

export const JobItemsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  //dependency on onother context
  const { debouncedSearchText } = useSearchTextContext();

  //state
  const { jobs, isLoading } = useSearchInJobs(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  //derived state / computed state
  const totalCountOfResults = jobs?.length || 0;
  const totalNumberOfPages = totalCountOfResults / RESULTS_PER_PAGE;

  const jobItemsSorted = [...(jobs || [])].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });

  const jobItemsSlicedAndSorted = jobItemsSorted.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  //event handlers
  const handleChangePage = (direction: PaginationDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChangeSort = (sortBy: SortBy) => {
    setSortBy(sortBy);
  };

  return (
    <JobItemsContext.Provider
      value={{
        jobs: jobs,
        jobItemsSortedAndSliced: jobItemsSlicedAndSorted,
        isLoading: isLoading,
        totalCountOfResults,
        totalNumberOfPages,
        currentPage,
        sortBy,
        handlechangePage: handleChangePage,
        handleChangeSort: handleChangeSort,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
};

export const useJobItemsContext = (): JobItemsContextType => {
  const context = useContext(JobItemsContext);
  if (!context) {
    throw new Error("useJobItems must be used within a JobItemsProvider");
  }
  return context;
};
