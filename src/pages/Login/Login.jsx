import React from "react";
import { LoginForm } from "../../component/LoginForm";
import { useState } from "react";
import { Category } from "../../component/Category";
import "./Login.css";
import firebase from "../../firebase";

const verifyCredentials = async (user,email, password) => {
  const db = firebase.firestore();
  const usersRef = db.collection(user);
  const query = usersRef.where("email", "==", email).where("password", "==", password);
  const querySnapshot = await query.get();

  if (!querySnapshot.empty) {

    // User exists with the given email and password
    const user = querySnapshot.docs[0].data();
    return true;
  } else {
    // No user exists with the given email and password
    console.log("Invalid email or password");
    return false;
  }
};


const Login = () => {
  const [category, setCategory] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const onChangeCategoryHandler = (e) => {
    setCategory(e.target.text);
  };

    const onChangeLoginFormHandler = (event) => {
    console.log(event.target.type)
    
    let userDetail = {
      email: userDetails.email,
      password: userDetails.password,
    };
  
    if (event.target.type == "email") {
      userDetail.email = event.target.value;
    } else {
      userDetail.password = event.target.value;
    }
    
    setUserDetails(userDetail);
 
  };

  const onSubmit = (e) => {
   
   if(verifyCredentials(category,userDetails['email'],userDetails['password'])){
    setIsLoggedIn(true);
   }
  }
  return (
    <>
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <Category user={category} onChangeHandler={onChangeCategoryHandler} />
            <div className="my-4">
              <LoginForm  userDetail={userDetails} onSubmit={onSubmit} onChangeHandler={onChangeLoginFormHandler} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
