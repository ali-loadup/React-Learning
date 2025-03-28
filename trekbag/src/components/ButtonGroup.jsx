import { useContext } from "react";
import { ItemsContext } from "../context/ItemsContextProvider";
import Button from "./Button";

export default function ButtonGroup() {
  const {
    handleMarkAllAsCompleted,
    handleMarkAllAsIncomplete,
    handleResetToInitialItems,
    handleRemoveAllItems,
  } = useContext(ItemsContext);

  return (
    <section className="button-group">
      <Button onClick={handleMarkAllAsCompleted} buttonType="secondary">
        mark all as complete
      </Button>
      <Button onClick={handleMarkAllAsIncomplete} buttonType="secondary">
        mark all as incomplete
      </Button>
      <Button onClick={handleResetToInitialItems} buttonType="secondary">
        reset to initial
      </Button>
      <Button onClick={handleRemoveAllItems} buttonType="secondary">
        remove all items
      </Button>
    </section>
  );
}
