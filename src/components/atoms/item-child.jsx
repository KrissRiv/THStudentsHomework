// eslint-disable-next-line react/prop-types
function ItemChild({id, name:text }) {
  return(<li key={id}>{text}</li>);
}

export default ItemChild;
