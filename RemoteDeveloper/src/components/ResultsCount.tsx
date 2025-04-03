export default function ResultsCount({
  totalCountOfRresults,
}: {
  totalCountOfRresults: number;
}) {
  return <p className="count">{totalCountOfRresults} results</p>;
}
