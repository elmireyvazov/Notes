import React, {useState} from "react";
import List from "../List";
import plusSvg from "../AddList/plus.svg";

import './AddButtonList.scss'

const AddListButton = () => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  return (
    <div className="add-list">
      <List
      onClick={() => setVisiblePopup (true)}
        items={[
          {
            className: "list__add-button",
            icon: <img src={plusSvg} alt="Это иконка списка" />,
            name: "Добавить список",
          },
        ]}
      />
      {visiblePopup && ( <div className="add-list__popup">Напишите сюда что нибудь</div>
      )}
    </div>
  );
};

export default AddListButton;
