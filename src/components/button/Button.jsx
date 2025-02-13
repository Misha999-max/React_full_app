import { useState } from 'react';
import './Button.css';

export default function Button({ name, text, onClick, disabled, showActiveBtn }) {
  const [isActive, setIsActive] = useState(false);
  function handleClick(e) {
    // if (e.target.classList.contains('active')) {
    //   setIsActive(false);
    // } else {
    //   setIsActive(true);
    // }
    console.log(e.target.name);
    onClick();
  }
  return (
    <button
      name={name}
      disabled={disabled}
      className={!showActiveBtn ? 'btn' : 'active'}
      onClick={(e) => handleClick(e)}
    >
      {text}
    </button>
  );
}
