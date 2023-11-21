import { v4 as uuid } from 'uuid';

import ItemChild from "../atoms/item-child";

function ListParent({ listItems, listParentItems }) {
  const getChilds = (subChilds) => {
    return subChilds.map((subchild) => (
      <>
        <ItemChild key={uuid()} id={uuid()} name={`- ${subchild.name}`} />
        {getLastChilds(subchild.id)}
      </>
    ));
  };

  const getLastChilds = (id) => {
    return listItems.map(
      (item) =>
        item.childs.length > 0 && (
          <ul key={uuid()}>
            {item.childs.map(
              (child) =>
                child.parent_id === id && (
                  <ItemChild key={uuid()} id={uuid()} name={`-- ${child.name}`} />
                )
            )}
          </ul>
        )
    );
  };

  return listParentItems.map((child) => (
    <>
      <ItemChild key={uuid()} id={uuid()} name={child.name} />
      {child.childs.length > 0 && <ul>{getChilds(child.childs)}</ul>}
    </>
  ));
}

export default ListParent;
