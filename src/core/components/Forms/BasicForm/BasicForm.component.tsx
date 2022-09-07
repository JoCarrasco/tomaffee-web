import { useEffect, useState } from 'react';

interface IBasicFormComponentProps {
  initialValue: string;
  allowEditOnClick?: boolean;
  onFormat?: (val: string) => string;
  onValidation?: (val: string) => boolean;
  onStopEdit: (val: string) => any;
  onFocus?: () => any;
}

export const BasicFormComponent = (props: IBasicFormComponentProps) => {
  useEffect(() => {
    setLastVal(props.initialValue);
  }, [props.initialValue]);
  const allowEditOnClick = props.allowEditOnClick
    ? props.allowEditOnClick
    : true;
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(props.initialValue);
  const [lastVal, setLastVal] = useState(val);

  function renderFlatStr() {
    return (
      <p onClick={() => (allowEditOnClick ? setIsEditing(true) : null)}>
        {val === props.initialValue ? props.initialValue : lastVal}
      </p>
    );
  }

  function handleFocus() {
    if (props.onFocus) {
      props?.onFocus();
    }
  }

  function handleStopEdit() {
    let isValid = true;
    if (props.onValidation) {
      isValid = props.onValidation(val);
    }

    if (isValid) {
      props.onStopEdit(val);
      setLastVal(() => val);
    } else {
      setVal(() => lastVal);
    }

    setIsEditing(false);
  }

  function onInputChange(val: string) {
    setVal(props.onFormat ? props.onFormat(val) : val);
  }

  function renderInteractiveInput() {
    return (
      <input
        type="text"
        value={val}
        onBlur={handleStopEdit}
        onFocus={handleFocus}
        onChange={(e) => onInputChange(e.target.value)}
        autoFocus
      />
    );
  }

  return isEditing ? renderInteractiveInput() : renderFlatStr();
};
