import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import useJobs from "../hooks/UseJobs";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import JobItemContent from "./JobItemContent";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import Sorting from "./SortingControls";
import JobList from "./JobList";
import Pagination from "./PaginationControls";
import { useDebounce } from "@uidotdev/usehooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constant";

function App() {
  //state
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [jobs, isLoading] = useJobs(debouncedSearchText);
  const [currntPage, setCurrentPage] = useState<number>(1);

  //derived state / computed state
  const totalCountOfResults = jobs?.length || 0;
  const totalNumberOfPages = totalCountOfResults / RESULTS_PER_PAGE;
  const jobItemsSlice = jobs.slice(
    (currntPage - 1) * RESULTS_PER_PAGE,
    currntPage * RESULTS_PER_PAGE
  );

  //event handlers
  const handleChangePage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalCountOfResults={totalCountOfResults} />
            <Sorting />
          </SidebarTop>

          <JobList jobs={jobItemsSlice} isLoading={isLoading} />

          <Pagination
            onClick={handleChangePage}
            currentPage={currntPage}
            totalNumberOfPages={totalNumberOfPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
