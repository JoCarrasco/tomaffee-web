import React from 'react';
import { IBackdropComponentProps } from './Backdrop.models';
import './Backdrop.style.scss';

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
