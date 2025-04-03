import { useLocalStorage } from "@uidotdev/usehooks";
import { createContext, useEffect, useState } from "react";

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
  const [bookmarsFromLocalStorage, setBookmarksInLocalStorage] =
    useLocalStorage<number[]>("bookmarks", []);

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

  const bookmarks = bookmarsFromLocalStorage;
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
