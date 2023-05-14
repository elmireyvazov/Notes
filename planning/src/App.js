import React, { useState } from "react";
import List from "./components/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList";
import Tasks from './components/Tasks'

import DB from "./assets/db.json";

function App() {
  const [lists, setLists] = useState(
    DB.lists.map((item) => {
      item.color = DB.colors.filter(
        (color) => color.id === item.colorId
      )[0].name;
      return item;
    })
  );

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  return (
    <div className="planning">
      <div className="planning__sidebar">
        <List
          items={[
            {
              icon: <img src={listSvg} alt="Это иконка списка" />,
              name: "Все задачи",
            },
          ]}
        />
        <List
          items={lists}
          onRemove={() => {
            alert(1);
          }}
          isRemovable
        />
        <AddList onAdd={onAddList} colors={DB.colors} />
      </div>
      <div className="planning__tasks">
        <Tasks/>
      </div>
    </div>
  );
}

export default App;
