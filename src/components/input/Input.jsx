import PropTypes from 'prop-types';

import './input.css';

export default function Input({ value, onChange }) {
  return <input type="text" value={value} className="" placeholder="Введи ToDo" onChange={onChange} />;
}

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
