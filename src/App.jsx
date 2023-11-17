import { React, useState } from "react";
import "./App.css";

function App({url}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState(null);

  const getCourses = async () => {
    try {
      const response = await fetch(`${url}${searchTerm}`);
      console.log("response ", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const parents = data.filter((item) => item.parent_id === 0);
      const list = [];
      const restList = [];
      parents.forEach((itemList) => {
        list.push({
          ...itemList,
          childs: data.filter((item) => item.parent_id === itemList.id),
        });
      });
      list.forEach((item) =>
        item.childs.map((child) => {
          restList.push({
            ...child,
            childs: data.filter((item) => item.parent_id === child.id),
          });
        })
      );
      setListItems(restList);
      setListParentItems(list);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSearchKeyUp = (e) => {
    if (e.key === "Enter") {
      onSearch(e);
      handlerSearch();
    }
  };

  const getList = () => {
    return (
      <ul data-testid="courses-collection">
        {listItems.map((item) => (
          <li key={item.id} data-testid="course">
            {item.name}
          </li>)
        )}
      </ul>
    );
  }

  const handlerSearch = () => {
    getCourses();
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
      {listItems && getList()}
    </>
  );
}

export default App;
