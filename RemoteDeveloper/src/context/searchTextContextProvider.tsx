import { useDebounce } from "@uidotdev/usehooks";
import React, { createContext, useContext, useState, ReactNode } from "react";

type SearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (text: string) => void;
};

const SearchTextContext = createContext<SearchTextContextType | null>(null);

export const SearchTextContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 250);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, debouncedSearchText, handleChangeSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export const useSearchTextContext = (): SearchTextContextType => {
  const context = useContext(SearchTextContext);
  if (!context) {
    throw new Error("useSearchText must be used within a SearchTextProvider");
  }
  return context;
};
