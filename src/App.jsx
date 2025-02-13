// eslint-disable no-console
import { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Button from './components/button/Button';
import Input from './components/input/Input';
import ListItem from './components/listItem/ListItem';

function App() {
  const [data, setData] = useState([]);
  const [showDate, setShowDate] = useState([]);
  const [value, setValue] = useState('');
  const [min, setMin] = useState('');
  const [seck, setSeck] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [showActiveBtn, setShowActiveBtn] = useState(false);
  const [showCompletedBtn, setShowCompletedBtn] = useState(false);
  const [showAllBtnActive, setShowAllBtnActive] = useState(false);

  function handleChangeValue(event) {
    setValue(event.target.value);
  }

  function handleChangeMin(e) {
    setMin(e.target.value.slice(0, 1));
  }

  function handleChangeSeck(e) {
    setSeck(e.target.value.slice(0, 2));
  }

  function handleSearchTodo(value) {
    console.log(value);
    setValueSearch(value);
    setShowDate(data.filter((item) => item.text.includes(value)));
    setShowAll(false);
  }
  function createTaskToDo(e) {
    if (e.keyCode === 13) {
      handleClickAdd();
    }
  }

  function handleClickAdd() {
    if (value === '' || min === '' || seck === '') return;
    setShowAllBtnActive(true);
    const todos = {
      text: value,
      id: Date.now(),
      isCompleted: false,
      isActive: false,
      min: min,
      seck: seck,
      timeAdded: new Date(),
    };
    setData([...data, todos]);
    setValue('');
    setMin('');
    setSeck('');
    setShowAll(true);
    console.log(data);
  }

  function handleShowDeletedToDo() {
    setShowAll(false);
    setShowDate(data.filter((item) => item.isCompleted === true));
  }

  function handleShowCompletedData() {
    setShowAll(false);
    setShowDate(data.filter((item) => item.isActive === true));
  }

  function handleShowAllToDo() {
    setShowAll(true);
    setShowDate(data);
  }

  function handleCompleteItem(id) {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted, isActive: false } : item))
    );
  }

  function handleDeleteItem(id) {
    setData(data.filter((item) => item.id !== id));
    setShowAll(data);
  }

  function handleChangeActive(id) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, isActive: !item.isActive, isCompleted: item.isCompleted ? false : item.isCompleted }
          : item
      )
    );
  }

  function handleClickBtnActive(e) {
    if (e.target.name === 'addBtn') {
      setShowAllBtnActive(true);
    }
    if (e.target.name === 'activeBtn') {
      setShowActiveBtn(true);
      setShowCompletedBtn(false);
      setShowAllBtnActive(false);
    }
    if (e.target.name === 'completedBtn') {
      setShowAllBtnActive(false);
      setShowCompletedBtn(true);
      setShowActiveBtn(false);
    }
    if (e.target.name === 'showAllBtn') {
      setShowAllBtnActive(true);
      setShowCompletedBtn(false);
      setShowActiveBtn(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="searcInput">
        <h3>Поиск</h3>
        <Input value={valueSearch} type="text" onChange={(e) => handleSearchTodo(e.target.value)} disc="Поле поиска" />
      </div>
      <div className="main">
        <form className="form_add" onKeyDown={(event) => createTaskToDo(event)}>
          Введи задачу
          <Input value={value} name="valueTask" onChange={(e) => handleChangeValue(e)} disc="Поле ввода задачи" />
          <Input
            type="number"
            maxlength={1}
            value={min}
            id="valueMin"
            onChange={(e) => handleChangeMin(e)}
            disc="Мин"
          />
          <Input
            type="number"
            maxlength={2}
            value={seck}
            id="valueSeck"
            onChange={(e) => handleChangeSeck(e)}
            disc="Сек"
          />
        </form>

        <div className="main-btn" onClick={(e) => handleClickBtnActive(e)}>
          <Button name="addBtn" text="Добавить" onClick={handleClickAdd} showActiveBtn={false} />
          <Button name="activeBtn" text="Активные" onClick={handleShowCompletedData} showActiveBtn={showActiveBtn} />
          <Button
            name="completedBtn"
            text="Завершенные"
            onClick={handleShowDeletedToDo}
            showActiveBtn={showCompletedBtn}
          />
          <Button name="showAllBtn" text="All" onClick={handleShowAllToDo} showActiveBtn={showAllBtnActive} />
        </div>
      </div>
      <main>
        <ul>
          {showAll ? (
            data.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onCompleted={handleCompleteItem}
                onDelete={handleDeleteItem}
                onChangeActive={handleChangeActive}
              />
            ))
          ) : showDate.length > 0 ? (
            showDate.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                onCompleted={handleCompleteItem}
                onDelete={handleDeleteItem}
                onChangeActive={handleChangeActive}
              />
            ))
          ) : (
            <p className="ampty-string">Здесь пока ни чего нЭЭЭЭЭЭту!!!</p>
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
