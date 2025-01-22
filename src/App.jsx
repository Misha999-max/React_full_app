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
    console.log(value);
  }

  function handleSearchTodo(value) {
    setValueSearch(value);
    setShowDate(data.filter((item) => item.text.includes(value)));
  }

  function handleClickAdd() {
    if (value === '') return;
    const todos = {
      text: value,
      id: Date.now(),
      isCompleted: false,
      isActive: false,
      timeAdded: new Date(),
    };
    setData([...data, todos]);
    setValue('');
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
    const showFilterDelete = data.filter((item) => item.id !== id);
    const isDeleteData = data.find((item) => item.id === id);
    if (isDeleteData) {
      isDeleteData.isCompleted = !isDeleteData.isCompleted;
      if (isDeleteData.isActive) {
        isDeleteData.isActive = !isDeleteData.isActive;
      }
    }
    setData([...showFilterDelete, isDeleteData]);
  }

  function handleDeleteItem(id) {
    setData(data.filter((item) => item.id !== id));
    setShowAll(data);
  }

  const handleChangeActive = (id) => {
    const showFilterActive = data.filter((item) => item.id !== id);
    const isActiveData = data.find((item) => item.id === id);
    if (isActiveData) {
      isActiveData.isActive = !isActiveData.isActive;
      if (isActiveData.isCompleted) {
        isActiveData.isCompleted = !isActiveData.isCompleted;
      }
    }
    setData([...showFilterActive, isActiveData]);
  };

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
