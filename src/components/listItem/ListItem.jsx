import Button from '../button/Button';
import PropTypes from 'prop-types';
import { useReducer, useEffect } from 'react';
// import debounce from 'lodash.debounce';
import './ListItem.css';

// ======================= useReducer =======================

const initialState = {
  start: 0,
  timerMin: 0,
  timerHours: 0,
  timerActive: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_START':
      return { ...state, start: action.payload };
    case 'INCREMENT_START':
      return { ...state, start: state.start + 1 };
    case 'SET_TIMER_MIN':
      return { ...state, timerMin: action.payload };
    case 'SET_TIMER_HOURS':
      return { ...state, timerHours: action.payload };
    case 'TOGGLE_TIMER_ACTIVE':
      return { ...state, timerActive: !state.timerActive };
    default:
      return state;
  }
}

export default function ListItem({ item, onCompleted, onDelete, onChangeActive }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timerStartCount;
    console.log('Timer Active:', state.timerActive);
    console.log('Item Active:', item.isActive);
    if (state.timerActive && item.isActive) {
      timerStartCount = setInterval(() => {
        dispatch({ type: 'INCREMENT_START' });
        localStorage.setItem(`timerStart-${item.id}`, state.start + 1);
      }, 1000);
    }
    return () => clearInterval(timerStartCount);
  }, [state.timerActive, item.isActive]);

  useEffect(() => {
    if (state.start >= 60) {
      dispatch({ type: 'SET_TIMER_MIN', payload: state.timerMin + 1 });
      dispatch({ type: 'SET_START', payload: 0 });
    }
    localStorage.setItem(`timerMin-${item.id}`, state.timerMin);
  }, [state.start]);

  useEffect(() => {
    if (state.timerMin >= 60) {
      dispatch({ type: 'SET_TIMER_HOURS', payload: state.timerHours + 1 });
      dispatch({ type: 'SET_TIMER_MIN', payload: 0 });
    }
    localStorage.setItem(`timerHours-${item.id}`, state.timerHours);
  }, [state.timerMin]);

  const handleComplete = () => {
    // onChangeActive(item.id);
    dispatch({ type: 'TOGGLE_TIMER_ACTIVE' }); // Останавливаем таймер
    onCompleted(item.id); // Вызываем функцию onCompleted
    localStorage.delete(`timerStart-${item.id}`);
  };

  // useEffect(() => {
  //   if (item.isActive) {
  //     setTimerActive(true); // Запускаем таймер, если задача активна
  //   }
  // }, [item.isActive]);

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
            {state.timerActive
              ? `выполнение задания... ${state.timerHours}ч:${state.timerMin}м:${state.start}сек`
              : `Выполненно за ${state.timerHours}ч:${state.timerMin}м:${state.start}сек`}
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
