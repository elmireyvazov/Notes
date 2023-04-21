import React from "react";
import List from "./components/List";
import listSvg from "./assets/img/list.svg";

function App() {
  return (
    <div className="planning">
      <div className="planning__sidebar">
        <List
          items={[
            {
              icon: (<img src={listSvg} alt="Это иконка списка"/>),
              name: "Все задачи",
            }
          ]}
        />
         <List
          items={[
            {
              color: '#42B883',
              name: "Покупки",
            },
            {
              color: '#64C4ED',
              name: "Фронтенд",
            },
            {
              color: '#FFBBCC',
              name: "Фильмы и сериалы",
            }
          ]}
        />
      </div>
      <div className="planning__tasks"></div>
    </div>
  );
}

export default App;
