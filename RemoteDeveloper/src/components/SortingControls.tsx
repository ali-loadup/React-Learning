import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../state/store";
import { RootState } from "../state/rootReducer";
import { setSortBy } from "../state/jobSearchSlice";

export default function Sorting() {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector((state: RootState) => state.jobSeacrh.sortBy);

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button
        className={`sorting__button sorting__button--relevant ${
          sortBy === "relevant" && "sorting__button--active"
        }`}
        onClick={() => dispatch(setSortBy("relevant"))}
      >
        Relevant
      </button>

      <button
        className={`sorting__button sorting__button--recent ${
          sortBy === "recent" && "sorting__button--active"
        }`}
        onClick={() => dispatch(setSortBy("recent"))}
      >
        Recent
      </button>
    </section>
  );
}
