import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PaginationDirection } from "../types/paginationDirection";
import { useJobItemsContext } from "../context/jobItemsContextProvider";

export default function Pagination() {
  const {currentPage, totalNumberOfPages, handlechangePage} = useJobItemsContext();
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
