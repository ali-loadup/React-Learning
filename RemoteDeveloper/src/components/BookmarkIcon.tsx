import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../context/bookmarksContextProvider";

type BookmarkIconProps = {
  jobId: number;
};

export default function BookmarkIcon({ jobId }: BookmarkIconProps) {
  const context = useContext(BookmarksContext);

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        context?.handleToggleBookmark(jobId);
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <BookmarkFilledIcon
        className={`
        ${context?.bookmarks.includes(jobId) ? "filled" : ""}
      `}
      />{" "}
    </button>
  );
}
