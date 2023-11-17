import { React, useState } from "react";

import { client } from "./services/courses-service";
import ListParent from "./components/molecules/list-parent";

import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);
  const [listParentItems, setListParentItems] = useState([]);

  const getCourses = () => {
    client
      .get(`?query=${searchTerm}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;
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
      })
      .catch((error) => {
        throw new Error("Network response was not ok");
      })
      .finally(() => setLoading(false));
  };

  const handlerInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlerSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    getCourses();
  };

  return (
    <>
      TH Students Homework
      <hr />
      <form onSubmit={handlerSubmit}>
        <input
          name="search"
          onChange={handlerInput}
          autoFocus
          data-testid="search"
        />
        <button type="submit" data-testid="go">
          Go
        </button>
      </form>
      {isLoading && <p>Loading...</p>}
      {listParentItems?.length > 0 && (
        <ul data-testid="courses-collection">
          <ListParent listItems={listItems} listParentItems={listParentItems} />
        </ul>
      )}
    </>
  );
}

export default App;
