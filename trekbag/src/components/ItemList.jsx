import Select from "react-select";
import { sortingOptions } from "../lib/constants.js";
import { useContext, useMemo, useState } from "react";
import { ItemsContext } from "../context/ItemsContextProvider.jsx";

export default function ItemList() {
  const { items, handleToggleItem, handleDeleteItem } =
    useContext(ItemsContext);
  const [sortBy, setSortBy] = useState(sortingOptions[0]);

  const sortelList = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy.value === "unpacked") {
          return a.packed - b.packed;
        } else if (sortBy.value === "packed") {
          return b.packed - a.packed;
        }
        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 && <li>No items in your list</li>}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            options={sortingOptions}
            defaultValue={sortBy}
            onChange={(option) => {
              setSortBy(option);
            }}
          />
        </section>
      ) : null}

      {sortelList.map((item) => (
        <Item
          handleToggleItem={handleToggleItem}
          handleDeleteItem={handleDeleteItem}
          key={item.id}
          item={item}
        />
      ))}
    </ul>
  );
}

function Item({ item, handleToggleItem, handleDeleteItem }) {
  return (
    <>
      <li className="item">
        <label>
          <input
            onChange={() => handleToggleItem(item.id)}
            type="checkbox"
            checked={item.packed}
          />
          {item.name}
        </label>

        <button
          onClick={() => {
            handleDeleteItem(item.id);
          }}
        >
          ❌
        </button>
      </li>
    </>
  );
}
