import Button from "./Button";

export default function ButtonGroup({
  onRemoveAllItems,
  onMarkAllAsComplete,
  onMarkAllAsIncomplete,
  onResetToInitialItems,
}) {
  return (
    <section className="button-group">
      <Button onClick={onMarkAllAsComplete} buttonType="secondary">
        mark all as complete
      </Button>
      <Button onClick={onMarkAllAsIncomplete} buttonType="secondary">
        mark all as incomplete
      </Button>
      <Button onClick={onResetToInitialItems} buttonType="secondary">
        reset to initial
      </Button>
      <Button onClick={onRemoveAllItems} buttonType="secondary">
        remove all items
      </Button>
    </section>
  );
}
