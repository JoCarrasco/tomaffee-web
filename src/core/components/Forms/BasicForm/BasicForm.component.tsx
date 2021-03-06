import { useState } from 'react';

interface IBasicFormComponentProps {
  initialValue?: string;
  allowEditOnClick?: boolean;
  onStopEdit: (val: string) => any;
  onFocus?: () => any;
}

export const BasicFormComponent = (props: IBasicFormComponentProps) => {
  const defaultValue = '';
  const allowEditOnClick = props.allowEditOnClick
    ? props.allowEditOnClick
    : true;
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(
    props.initialValue ? props.initialValue : defaultValue,
  );

  function renderFlatStr() {
    return (
      <p onClick={() => (allowEditOnClick ? setIsEditing(true) : null)}>
        {props.initialValue}
      </p>
    );
  }

  function handleFocus() {
    if (props.onFocus) {
      props?.onFocus();
    }
  }

  function handleStopEdit() {
    props.onStopEdit(val);
    setIsEditing(false);
  }

  function renderInteractiveInput() {
    return (
      <input
        type="text"
        value={val}
        onBlur={handleStopEdit}
        onFocus={handleFocus}
        onChange={(e) => setVal(e.target.value)}
        autoFocus
      />
    );
  }

  return isEditing ? renderInteractiveInput() : renderFlatStr();
};
