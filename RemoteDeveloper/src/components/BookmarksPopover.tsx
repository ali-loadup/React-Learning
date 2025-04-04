import { useBookmarksContext } from "../context/bookmarksContextProvider";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const context = useBookmarksContext();

  return (
    <div className="bookmarks-popover">
      <JobList
        jobs={context.bookmarkedJobs}
        isLoading={context.isLoading}
      ></JobList>
    </div>
  );
}
