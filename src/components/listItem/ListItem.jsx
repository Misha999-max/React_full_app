import Button from '../button/Button';
import PropTypes from 'prop-types';
import './ListItem.css';

export default function ListItem({ item, onCompleted, onDelete, onChangeActive }) {
  return (
    <li>
      <div>
        <p className={item.isCompleted ? 'delete-item' : item.isActive ? 'active-item' : ''}>{item.text}</p>
        <span>Добавленно: {item.timeAdded.toLocaleTimeString()}</span>
      </div>
      <div>
        <input type="checkbox" checked={item.isActive} onChange={() => onChangeActive(item.id)} />
        <Button text="Выполнено" onClick={() => onCompleted(item.id)} />
        <Button className="deleteItem" text="Delete" onClick={() => onDelete(item.id)} />
      </div>
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    timeAdded: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
};
