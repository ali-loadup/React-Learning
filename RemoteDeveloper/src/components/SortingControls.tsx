import { useJobItemsContext } from "../context/jobItemsContextProvider";

export default function Sorting() {
  const context = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          context.sortBy === "relevant" && "sorting__button--active"
        }`}
        onClick={() => context.handleChangeSort("relevant")}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          context.sortBy === "recent" && "sorting__button--active"
        }`}
        onClick={() => context.handleChangeSort("recent")}
      >
        Recent
      </button>
    </section>
  );
}
