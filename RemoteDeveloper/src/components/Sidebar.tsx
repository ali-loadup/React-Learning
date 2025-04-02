import JobList from "./JobList";
import Pagination from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingCOntrols from "./SortingControls";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingCOntrols />
      </div>

      <JobList />

      <Pagination />
    </div>
  );
}
