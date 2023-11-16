import { useState } from 'react';
import './App.css'

function App () {
  const [searchTerm, setSearchTerm] = useState('');
  const [listItems, setListItms] = useState([]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlerSearch = () => {
    setListItms([searchTerm]);
  }

  return (
    <>
      TH Students Homework
      <hr />
      <input onChange={(e) => onSearch(e)} autoFocus data-testid="search" />
      <button onClick={handlerSearch} data-testid="go">Go</button>
      {listItems.length > 0 && (
        <ul data-testid="courses-collection">
          <li data-testid="course"></li>
        </ul>
      )}
    </>
  )
}

export default App
