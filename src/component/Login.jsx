import React from "react";
import { Category } from "./Category";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
export const Login = (props) => {
  const [user, setUser] = useState({ category: "" });
  const onChangeHandler = (newUser) => {
    setUser(newUser);
    console.log(JSON.stringify(user) + "from Login");
  };
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-3"></div>
      <div className="col-lg-6 col-md-6 col-sm-6">
        <Category user={user} onChangeHandler={onChangeHandler} />
        <LoginForm user={user} onChangeHandler={onChangeHandler} />
      </div>
      <div className="col-lg-3 col-md-3 col-sm-3"></div>
    </div>
  );
};
