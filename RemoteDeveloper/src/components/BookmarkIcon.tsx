import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { toggleBookmark } from "../state/bookmarkSlice";

type BookmarkIconProps = {
  jobId: number;
};

export default function BookmarkIcon({ jobId }: BookmarkIconProps) {
  const dispatch = useDispatch<AppDispatch>();

  const bookmarks = useSelector((state: RootState) => state.bookmark.bookmarks);

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        dispatch(toggleBookmark(jobId));
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`
        ${bookmarks.includes(jobId) ? "filled" : ""}
      `}
      />{" "}
    </button>
  );
}
