import React from "react";
import { useState } from "react";

export const Category = (props) => {
  const [category, setCategory] = useState("");
  const onClickHandler = (event) => {
    event.preventDefault();
    setCategory(event.target.text);

    props.onChangeHandler(event);
  };
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {category === "" ? "Patient" : category}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="/#" onClick={onClickHandler}>
          Doctor
        </a>
        <a className="dropdown-item" href="/#" onClick={onClickHandler}>
          Patient
        </a>
        <a className="dropdown-item" href="/#" onClick={onClickHandler}>
          Staff
        </a>
      </div>
    </div>
  );
};
