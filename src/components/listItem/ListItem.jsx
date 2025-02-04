import Button from '../button/Button';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
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

  const debouncedSetStart = debounce((setStart, newStart) => {
    setStart(newStart);
  }, 1000);

  const debouncedSetLocalStorage = debounce((key, value) => {
    localStorage.setItem(key, value);
  }, 1000);

  useEffect(() => {
    let timerStartCoute;
    console.log('Timer Active:', timerActive);
    console.log('Item Active:', item.isActive);
    if (timerActive && item.isActive) {
      timerStartCoute = setInterval(() => {
        setStart((prevStart) => {
          const newStart = prevStart + 1;
          console.log('Updated Start:', newStart); // Отладочное сообщение
          debouncedSetStart(setStart, newStart);
          // Оптимизация: обновляем localStorage каждые 5 секунд
          if (newStart % 5000 === 0) {
            debouncedSetLocalStorage(`timerStart-${item.id}`, newStart);
          }
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
        // Оптимизация: обновляем localStorage каждые 5 минут
        if (newMin % 5 === 0) {
          debouncedSetLocalStorage(`timerStart-${item.id}`, newMin);
        }
        return newMin;
      });
      setStart(0);
    }

    if (timerMin >= 60) {
      setTimerMin(0);
      setTimerHours((prevHours) => {
        const newHours = prevHours + 1;
        // Оптимизация: обновляем localStorage каждые 1 час
        localStorage.setItem(`timerHours-${item.id}`, newHours);
        return newHours;
      });
    }
  }, [start, timerMin, timerHours, item.id]);

  const handleComplete = () => {
    // onChangeActive(item.id);
    setTimerActive(false); // Останавливаем таймер
    onCompleted(item.id); // Вызываем функцию onCompleted
    localStorage.delete(`timerStart-${item.id}`);
  };

  useEffect(() => {
    if (item.isActive) {
      setTimerActive(true); // Запускаем таймер, если задача активна
    }
  }, [item.isActive]);

  // useEffect(() => {
  //   console.log('Timer Active:', timerActive);
  //   console.log('Item Active:', item.isActive);
  // }, [timerActive, item.isActive]);

  return (
    <li>
      <div>
        <p className={item.isCompleted ? 'delete-item' : item.isActive ? 'active-item' : ''}>{item.text}</p>
        <span>Добавленно: {item.timeAdded.toLocaleTimeString()}</span>
        <div className="timer_zone">
          <span>
            {timerActive
              ? `выполнение задания... ${timerHours}ч:${timerMin}м:${start}сек`
              : `Выполненно за ${timerHours}ч:${timerMin}м:${start}сек`}
          </span>
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
