import React from "react";
import { LoginForm } from "../../component/LoginForm";
import { useState } from "react";
import { Category } from "../../component/Category";
import "./Login.css";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";


const verifyCredentials = async (user,email, password) => {
   const db = firebase.firestore();
  const usersRef = db.collection(user);
  const query = usersRef.where("email", "==", email).where("password", "==", password);
  const querySnapshot = await query.get();

  
  if (!querySnapshot.exists) {

    // User exists with the given email and password
    return querySnapshot.docs[0].data();
  } else {
    // No user exists with the given email and password
    console.log("Invalid email or password");
    return false;
  }
};


const Login = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Patient");
  const [data,setData] = useState(null);
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const onChangeCategoryHandler = (e) => {
    setCategory(e.target.text);
  };

    const onChangeLoginFormHandler = (event) => {
   
    
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

    
   verifyCredentials(category,userDetails['email'],userDetails['password'])
  .then((data) => {
  console.log(data);
  setIsLoggedIn(true)
   setData(data);
  })  
  navigate("/staff",{state:{data:data,isLoggedIn:isLoggedIn}})
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
