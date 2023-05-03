import React, { useState } from "react";
import List from "./components/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList";

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
        <List items={lists} isRemovable />
        <AddList colors={DB.colors} />
      </div>
      <div className="planning__tasks"></div>
    </div>
  );
}

export default App;
