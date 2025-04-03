import { createContext, useState } from "react";

type BookmarksContext = {
  bookmarks: number[];
  handleToggleBookmark: (jobId: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);
import { ReactNode } from "react";

export default function BookmarksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const handleToggleBookmark = (jobId: number) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(jobId);
      if (isBookmarked) {
        return prev.filter((id) => id !== jobId);
      } else {
        return [...prev, jobId];
      }
    });
  };
  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        handleToggleBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
