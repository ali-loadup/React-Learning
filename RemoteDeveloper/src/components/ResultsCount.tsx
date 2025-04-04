import { useJobItemsContext } from "../context/jobItemsContextProvider";

export default function ResultsCount() {
  const { totalCountOfResults } = useJobItemsContext();

  return <p className="count">{totalCountOfResults} results</p>;
}
