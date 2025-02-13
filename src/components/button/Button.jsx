import './Button.css';

export default function Button({ name, text, onClick, disabled, showActiveBtn }) {
  function handleClick() {
    // if (e.target.classList.contains('active')) {
    //   setIsActive(false);
    // } else {
    //   setIsActive(true);
    // }
    onClick();
  }
  return (
    <button name={name} disabled={disabled} className={!showActiveBtn ? 'btn' : 'active'} onClick={handleClick}>
      {text}
    </button>
  );
}
