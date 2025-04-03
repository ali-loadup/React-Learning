import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export default function Pagination({
  onClick,
  currentPage,
  totalNumberOfPages,
}) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction={"prev"}
          currentPage={currentPage}
          onClick={() => onClick("prev")}
        ></PaginationButton>
      )}

      {currentPage < totalNumberOfPages && (
        <PaginationButton
          direction={"next"}
          currentPage={currentPage}
          onClick={() => onClick("next")}
        ></PaginationButton>
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "prev" | "next";
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
      onClick={ e=> {onClick(); e.target.blur()}}
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
