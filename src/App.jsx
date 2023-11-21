import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

import { client } from "./services/courses-service";
import ListParent from "./components/molecules/list-parent";

import "./App.css";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [listItems, setListItems] = useState([]);
  const [listParentItems, setListParentItems] = useState([]);

  const getCourses = () => {
    client
      .get(`?query=${searchTerm}`)
      .then((response) => {
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
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const handlerInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    getCourses();
  };

  return (
    <>
      <h1 data-testid="title">TH Students Homework</h1>
      <hr />
      <form onSubmit={handlerSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What do you learn today?"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            name="search"
            onChange={handlerInput}
            autoFocus
            data-testid="search"
          />
          <button
            className="btn btn-primary btn-outline-secondary text-white"
            type="submit"
            id="button-addon2"
            data-testid="go"
          >
            Go
          </button>
        </div>
      </form>
      {isLoading && <p>Loading...</p>}
      {isError && (
        <div className="alert alert-danger" role="alert">
          ERROR: Ups! I did it again! Please refresh after 10 seconds
        </div>
      )}
      {isLoading && (
        <Player
          src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"
          className="player"
          loop
          autoplay
          style={{ height: "200px", width: "200px" }}
        />
      )}
      {!isLoading && !isError && listParentItems?.length > 0 && (
        <ul data-testid="courses-collection">
          <ListParent listItems={listItems} listParentItems={listParentItems} />
        </ul>
      )}
    </>
  );
}

export default App;
