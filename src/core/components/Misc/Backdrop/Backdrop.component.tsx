import React from 'react';
import './Backdrop.style.scss';

interface IBackdropComponentProps {
  children: any;
  onOutsideClick: () => any;
}

export const BackdropComponent = (props: IBackdropComponentProps) => {
  function handleClick(e: any) {
    if (e.target && e.target.className === 'misc-backdrop-component') {
      props.onOutsideClick();
    }
  }

  return (
    <div className="misc-backdrop-component" onClick={(e) => handleClick(e)}>
      {props.children}
    </div>
  );
}
