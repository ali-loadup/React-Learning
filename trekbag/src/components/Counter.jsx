export default function Counter({ items }) {
  return <p>{items.filter((x) => x.packed).length} / {items.length} items packed.</p>;
}
