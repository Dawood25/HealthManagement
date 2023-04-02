import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

export const LoginForm = (props) => {


  return (
    <form onSubmit={(e)=>{props.onSubmit(e)}} className="p-3 bg-light shadow border rounded">
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          onChange={(e)=>{props.onChangeHandler(e)}}
          value={props.userDetail.email}
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
          onChange={(e)=>{props.onChangeHandler(e)}}
          value={props.userDetail.password}
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
