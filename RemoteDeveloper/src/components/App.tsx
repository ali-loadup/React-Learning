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

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [jobs, isLoading] = useJobs(debouncedSearchText);

  const totalCountOfResults = jobs?.length || 0;
  const jobItemsSlice = jobs.slice(0, 7);
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

          <Pagination />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
