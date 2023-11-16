import { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItms] = useState([]);

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearchKeyUp = (e) => {
    if (e.key === "Enter") {
      debugger;
      onSearch(e);
      handlerSearch();
    }
  };

  const handlerSearch = () => {
    setListItms([searchTerm]);
  };

  return (
    <>
      TH Students Homework
      <hr />
      <input
        onChange={(e) => onSearch(e)}
        onKeyUp={(e) => onSearchKeyUp(e)}
        autoFocus
        data-testid="search"
      />
      <button onClick={handlerSearch} data-testid="go">
        Go
      </button>
      {listItems.length > 0 && (
        <ul data-testid="courses-collection">
          <li data-testid="course"></li>
        </ul>
      )}
    </>
  );
}

export default App;
