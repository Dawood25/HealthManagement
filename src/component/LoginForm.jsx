import React from "react";
import { useState } from "react";

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
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={onChangeHandler}
          value={userDetails.email}
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="Password"
          onChange={onChangeHandler}
          value={userDetails.password}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
