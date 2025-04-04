import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useContext } from "react";
import { ReactNode } from "react";
import { Job } from "../models/job";
import useJobs from "../hooks/UseJobs";

type BookmarksContext = {
  bookmarks: number[];
  bookmarkedJobs: Job[];
  isLoading: boolean;
  handleToggleBookmark: (jobId: number) => void;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

export default function BookmarksContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [bookmarsFromLocalStorage, setBookmarksInLocalStorage] =
    useLocalStorage<number[]>("bookmarks", []);

  const bookmarks = bookmarsFromLocalStorage;

  const { jobs: bookmarkedJobs, isLoading } = useJobs(bookmarks);

  const handleToggleBookmark = (jobId: number) => {
    setBookmarksInLocalStorage((prev) => {
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
        bookmarkedJobs,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error(
      "useBookmarksContext must be used within a BookmarksContextProvider"
    );
  }
  return context;
}
