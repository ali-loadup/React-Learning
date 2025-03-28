import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

export default function Sidebar({
  handleAddItem,
  handleRemoveAllItems,
  handleMarkAllAsComplete,
  handleMarkAllAsIncomplete,
  handleResetToInitialItems,
}) {
  return (
    <div className="sidebar">
      <AddItemForm onAddItem={handleAddItem} />
      <ButtonGroup
        onRemoveAllItems={handleRemoveAllItems}
        onMarkAllAsComplete={handleMarkAllAsComplete}
        onMarkAllAsIncomplete={handleMarkAllAsIncomplete}
        onResetToInitialItems={handleResetToInitialItems}
      />
    </div>
  );
}
