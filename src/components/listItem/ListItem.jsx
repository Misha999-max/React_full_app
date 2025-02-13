import Button from '../button/Button';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import debounce from 'lodash.debounce';
import './ListItem.css';

// ======================= useReducer =======================

export default function ListItem({ item, onCompleted, onDelete, onChangeActive }) {
  const [[min, seck], setTime] = useState([+item.min, +item.seck]);
  const [over, setOver] = useState(false);

  const tick = () => {
    if (over) return;
    if (min === 0 && seck === 0) {
      setOver(true);
    } else if (seck == 0) {
      setTime([min - 1, 59]);
    } else {
      setTime([min, seck - 1]);
    }
    console.log(min);
  };

  useEffect(() => {
    let timerID;
    if (item.isActive) {
      timerID = setInterval(() => tick(), 1000);
    }

    return () => clearInterval(timerID);
  }, [min, seck]);

  const handleComplete = () => {
    onChangeActive(item.id);
    onCompleted(item.id);
  };

  return (
    <li>
      <div>
        <p className={item.isCompleted ? 'delete-item' : item.isActive ? 'active-item' : ''}>{item.text}</p>
        <span>Добавленно: {item.timeAdded.toLocaleTimeString()}</span>
        <div className="timer_zone">
          <span>{item.isActive ? `выполнение задания... ${min}м:${seck}сек` : `Выполненно за ${min}м:${seck}сек`}</span>
        </div>
      </div>
      <div>
        <input id="start_id" type="checkbox" checked={item.isActive} onChange={() => onChangeActive(item.id)} />
        {!item.isActive ? <span className="start__span">НАЧАТЬ</span> : <span className="stop__span">СТОП</span>}
        <Button
          text="Выполнено"
          onClick={() => {
            handleComplete(item.id);
          }}
        />
        <Button className="deleteItem" text="Delete" onClick={() => onDelete(item.id)} />
      </div>
    </li>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    min: PropTypes.string.isRequired,
    seck: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    timeAdded: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
};
