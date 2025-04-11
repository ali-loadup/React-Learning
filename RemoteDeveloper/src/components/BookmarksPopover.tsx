import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { useQueries } from "@tanstack/react-query";
import { RootState } from "../state/store";
import { Job } from "../models/job";
import { BASE_API_URL } from "../lib/constant";
import JobList from "./JobList";

export const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  const jobQueries = useQueries({
    queries: bookmarks.map((id) => ({
      queryKey: ["job", id],
      queryFn: async (): Promise<Job> => {
        const response = await fetch(`${BASE_API_URL}/${id}`);
        const data = await response.json();
        return data.jobItem;
      },
      enabled: bookmarks.length > 0,
    })),
  });

  const isLoading = jobQueries.some((q) => q.isLoading);
  const bookmarkedJobs = jobQueries
    .map((q) => q.data)
    .filter((job): job is Job => Boolean(job)); 

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobs={bookmarkedJobs} isLoading={isLoading} />
    </div>,
    document.body
  );
});
