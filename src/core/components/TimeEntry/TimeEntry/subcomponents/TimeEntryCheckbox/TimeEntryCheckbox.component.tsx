export const TimeEntryCheckboxComponent = ({ value, onChange }: { value: any; onChange: any}) => {
  return (
    <div className="time-entry-selection">  
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
      </label>
    </div>
  );
};
