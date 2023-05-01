import React from "react";
import List from "./components/List";
import listSvg from "./assets/img/list.svg";
import AddList from "./components/AddList";

import DB from "./assets/db.json";

function App() {
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
          items={[
            {
              color: "green",
              name: "Покупки",
            },
            {
              color: "blue",
              name: "Фронтенд",
              active: true,
            },
            {
              color: "pink",
              name: "Фильмы и сериалы",
            },
          ]}
          isRemovable
        />
        <AddList colors={DB.colors} />
      </div>
      <div className="planning__tasks"></div>
    </div>
  );
}

export default App;
