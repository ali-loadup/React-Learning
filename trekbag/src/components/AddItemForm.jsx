import { useContext, useRef, useState } from "react";
import Button from "./Button";
import { ItemsContext } from "../context/ItemsContextProvider";

export default function AddItemForm() {
  const { handleAddItem } = useContext(ItemsContext);

  const [itemText, setItemText] = useState("");
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemText) {
      alert("Please enter an item name");
      inputRef.current.focus();
      return;
    }

    handleAddItem(itemText);
    setItemText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={(e) => {
          setItemText(e.target.value);
        }}
      ></input>
      <Button>Add to list</Button>
    </form>
  );
}
