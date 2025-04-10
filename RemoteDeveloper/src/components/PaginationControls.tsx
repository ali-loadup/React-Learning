import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationDirection } from "../types/paginationDirection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/rootReducer";
import { AppDispatch } from "../state/store";
import { setCurrentPage } from "../state/jobSearchSlice";

export default function Pagination() {
  const currentPage = useSelector(
    (state: RootState) => state.jobSeacrh.currentPage
  );
  const dispatch = useDispatch<AppDispatch>();
  const totalNumberOfPages = useSelector(
    (state: RootState) => state.jobSeacrh.totalNumberOfPages
  );

  const handlechangePage = (direction: "prev" | "next") => {
    if (direction === "prev") {
      dispatch(setCurrentPage(currentPage - 1));
    }
    if (direction === "next") {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"prev"}
          currentPage={currentPage}
          onClick={() => handlechangePage("prev")}
        ></PaginationButton>
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={() => handlechangePage("next")}
        ></PaginationButton>
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PaginationDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onClick();
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {direction === "prev" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
