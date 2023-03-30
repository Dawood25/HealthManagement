import React from "react";
import { LoginForm } from "../../component/LoginForm";
import { useState } from "react";
import { Category } from "../../component/Category";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({ category: "" });
  const onChangeHandler = (newUser) => {
    setUser(newUser);
    console.log(JSON.stringify(user) + "from Login");
  };
  return (
    <>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <Category user={user} onChangeHandler={onChangeHandler} />
            <div className="my-4">
              <LoginForm user={user} onChangeHandler={onChangeHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
