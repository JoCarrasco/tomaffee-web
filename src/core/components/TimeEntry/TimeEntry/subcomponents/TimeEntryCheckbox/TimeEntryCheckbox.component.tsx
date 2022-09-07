export const TimeEntryCheckboxComponent = ({
  value,
  onValueChange,
}: {
  value: any;
  onValueChange: any;
}) => {
  return (
    <div className="time-entry-selection">
      <label>
        <input type="checkbox" checked={value} onChange={onValueChange} />
      </label>
    </div>
  );
};
