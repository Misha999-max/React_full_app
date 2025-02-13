import PropTypes from 'prop-types';

import './input.css';

export default function Input({ value, type, maxLength, onChange, disc }) {
  return (
    <input
      type={type ? type : 'text'}
      maxLength={maxLength ? maxLength : Infinity}
      value={value}
      className=""
      placeholder={disc}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  maxLength: PropTypes.string,
  type: PropTypes.string,
  disc: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
