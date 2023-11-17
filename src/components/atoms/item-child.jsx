import { React } from "react";

function ItemChild({id, name: text }) {
  return(<li key={id}>{text}</li>);
}

export default ItemChild;
