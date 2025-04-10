import { forwardRef, useEffect, useState } from "react";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setLoadingForBookmarkPopover } from "../state/uiSlice";
import { Job } from "../models/job";
import { BASE_API_URL } from "../lib/constant";

export const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchBookmarkedJobs = async () => {
      dispatch(setLoadingForBookmarkPopover(true));

      const responses: Job[] = await Promise.all(
        bookmarks.map((id) =>
          fetch(`${BASE_API_URL}/${id}`)
            .then((res) => res.json())
            .then((data) => data.jobItem)
        )
      ).finally(() => {
        dispatch(setLoadingForBookmarkPopover(false));
      });

      setBookmarkedJobs(responses || []);
    };
    fetchBookmarkedJobs();
  }, [bookmarks, dispatch]);

  const isLoading = useSelector(
    (state: RootState) => state.ui.isLoadingForBookmarkPopover
  );

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobs={bookmarkedJobs} isLoading={isLoading}></JobList>
    </div>,
    document.body
  );
});
