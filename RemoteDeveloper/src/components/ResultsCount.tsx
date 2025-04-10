import { useSelector } from "react-redux";
import { RootState } from "../state/rootReducer";

export default function ResultsCount() {
  const count = useSelector(
    (state: RootState) => state.jobSeacrh.totalCountOfResults
  );

  return <p className="count">{count} results</p>;
}
