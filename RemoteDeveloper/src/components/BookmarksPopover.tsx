import { forwardRef } from "react";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const bookmarkedJobs = useSelector(
    (state: RootState) => state.bookmark.bookmarkedJobs
  );

  const isLoading = useSelector((state: RootState) => state.bookmark.isLoading);

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobs={bookmarkedJobs} isLoading={isLoading}></JobList>
    </div>,
    document.body
  );
});
