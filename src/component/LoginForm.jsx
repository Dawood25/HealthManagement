import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

export const LoginForm = (props) => {
  const user = props.user;
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const onChangeHandler = (event) => {
    let userDetail = {
      email: userDetails.email,
      password: userDetails.password,
    };
    event.preventDefault();
    if (event.target.type == "email") {
      userDetail.email = event.target.value;
    } else {
      userDetail.password = event.target.value;
    }
    setUserDetails(userDetail);
    user.password = userDetail.password;
    user.email = userDetail.email;
    props.onChangeHandler(user);
  };

  return (
    <form className="p-3 bg-light shadow border rounded">
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={onChangeHandler}
          value={userDetails.email}
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          onChange={onChangeHandler}
          value={userDetails.password}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/patient_reg" className="text-primary">
          Register
        </Link>
      </div>
    </form>
  );
};
