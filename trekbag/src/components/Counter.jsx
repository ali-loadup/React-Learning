import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContextProvider";

export default function Counter() {
  const {items } = useContext(ItemsContext);
  return <p>{items.filter((x) => x.packed).length} / {items.length} items packed.</p>;
}
