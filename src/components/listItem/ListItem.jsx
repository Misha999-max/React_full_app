import Button from '../button/Button';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import './ListItem.css';

export default function ListItem({ item, onCompleted, onDelete, onChangeActive }) {
  const [start, setStart] = useState(() => {
    const savedStart = localStorage.getItem(`timerStart-${item.id}`);
    return savedStart ? parseInt(savedStart, 10) : 0; // Инициализируем из localStorage
  });
  // const [result, setResult] = useState(null);
  const [timerMin, setTimerMin] = useState(() => {
    const savedMin = localStorage.getItem(`timerMin-${item.id}`);
    return savedMin ? parseInt(savedMin, 10) : 0; // Инициализируем из localStorage
  });
  const [timerHours, setTimerHours] = useState(() => {
    const savedHours = localStorage.getItem(`timerHours-${item.id}`);
    return savedHours ? parseInt(savedHours, 10) : 0; // Инициализируем из localStorage
  });
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timerStartCoute;
    if (timerActive && item.isActive) {
      timerStartCoute = setInterval(() => {
        setStart((prevStart) => {
          const newStart = prevStart + 30;
          localStorage.setItem(`timerStart-${item.id}`, newStart);
          return newStart;
        });
      }, 1000);
    }

    return () => clearInterval(timerStartCoute);
  }, [timerActive, item.isActive, item.id]);

  useEffect(() => {
    if (start >= 60) {
      setTimerMin((prevMin) => {
        const newMin = prevMin + 1;
        localStorage.setItem(`timerMin-${item.id}`, newMin); // Сохраняем в localStorage
        return newMin;
      });
      setStart(0);
    }

    if (timerMin >= 60) {
      setTimerMin(0);
      setTimerHours((prevHours) => {
        const newHours = prevHours + 1;
        localStorage.setItem(`timerHours-${item.id}`, newHours); // Сохраняем в localStorage
        return newHours;
      });
    }
  }, [start, timerMin, timerHours, item.id]);

  const handleComplete = () => {
    setTimerActive(false); // Останавливаем таймер
    onCompleted(item.id); // Вызываем функцию onCompleted
  };

  useEffect(() => {
    if (item.isActive) {
      setTimerActive(true); // Запускаем таймер, если задача активна
    }
  }, [item.isActive]);

  useEffect(() => {
    console.log('Timer Active:', timerActive);
    console.log('Item Active:', item.isActive);
  }, [timerActive, item.isActive]);

  return (
    <li>
      <div>
        <p className={item.isCompleted ? 'delete-item' : item.isActive ? 'active-item' : ''}>{item.text}</p>
        <span>Добавленно: {item.timeAdded.toLocaleTimeString()}</span>
        <div className="timer_zone">
          <span>{timerActive ? 'выполнение задания....' : `Выполненно за ${timerHours}ч:${timerMin}м`}</span>
        </div>
      </div>
      <div>
        <input type="checkbox" checked={item.isActive} onChange={() => onChangeActive(item.id)} />
        <Button
          text="Выполнено"
          onClick={() => {
            handleComplete();
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
    start: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    timeAdded: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChangeActive: PropTypes.func.isRequired,
};
