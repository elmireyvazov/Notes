import React from "react";
import listSvg from './assets/img/list.svg'

function App() {
  return (
    <div className="planning">
      <div className="planning__sidebar">
        <ul className="planning__list">
          <li className="active">
            <i>
              <img src={listSvg} alt="Иконка списка"/>
            </i>
            <span>
              Все задачи
            </span>
          </li>
        </ul>
      </div>
      <div className="planning__tasks"></div>
    </div>
  );
}

export default App;
