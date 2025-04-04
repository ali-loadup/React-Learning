import { forwardRef } from "react";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { useBookmarksContext } from "../context/bookmarksContextProvider";

export const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobs, isLoading } = useBookmarksContext();
  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobs={bookmarkedJobs} isLoading={isLoading}></JobList>
    </div>,
    document.body
  );
});
