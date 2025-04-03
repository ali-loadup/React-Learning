export default function ResultsCount({
  totalCountOfResults,
}: {
  totalCountOfResults: number;
}) {
  return <p className="count">{totalCountOfResults} results</p>;
}
