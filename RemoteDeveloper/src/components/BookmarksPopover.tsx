import { forwardRef } from "react";
import { useBookmarksContext } from "../context/bookmarksContextProvider";
import JobList from "./JobList";

export const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const context = useBookmarksContext();

  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList
        jobs={context.bookmarkedJobs}
        isLoading={context.isLoading}
      ></JobList>
    </div>
  );
});
