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
  const [valueSearch, setValueSearch] = useState('');
  const [showAll, setShowAll] = useState(true);

  function handleChange(value) {
    setValue(value);
  }

  function handleSearchTodo(value) {
    setValueSearch(value);
    setShowDate(data.filter((item) => item.text.includes(value)));
    setShowAll(false);
  }

  function handleClickAdd() {
    if (value === '') return;
    const todos = {
      text: value,
      id: Date.now(),
      isCompleted: false,
      isActive: false,
      start: 0,
      timeAdded: new Date(),
    };
    setData([...data, todos]);
    setValue('');
    setShowAll(true);
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

  return (
    <div>
      <Header />
      <div className="searcInput">
        <h3>Поиск</h3>
        <Input value={valueSearch} onChange={(e) => handleSearchTodo(e.target.value)} />
      </div>
      <div className="main">
        <Input value={value} onChange={(e) => handleChange(e.target.value)} />
        <div className="main-btn">
          <Button text="Добавить" onClick={handleClickAdd} />
          <Button text="Активные" onClick={handleShowCompletedData} />
          <Button text="Завершенные" onClick={handleShowDeletedToDo} />
          <Button text="All" onClick={handleShowAllToDo} />
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
