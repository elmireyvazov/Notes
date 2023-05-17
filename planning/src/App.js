import React, { useState, useEffect } from "react";
import listSvg from "./assets/img/list.svg";
import axios from "axios";

import { List, AddList, Task } from "./components";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

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
        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id);
              setLists(newLists);
            }}
            isRemovable
          />
        ) : (
          "Загрузка..."
        )}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="planning__tasks">{lists && <Task list={lists[1]} />}</div>
    </div>
  );
}

export default App;
