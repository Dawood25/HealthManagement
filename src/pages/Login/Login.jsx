import React from "react";
import { LoginForm } from "../../component/LoginForm";
import { useState,useEffect } from "react";
import { Category } from "../../component/Category";
import "./Login.css";
import firebase from "../../firebase";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Patient");
  const [loggedIn,setIsLoggedIn] = useState(false)
  const [doctorData, setDoctorData] = useState(null);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });

  useEffect(() => {
    const fetchDoctorData = async () => {
      const doctorRef = await firebase
        .firestore()
        .collection(category)
        .where("email", "==", userDetails.email)
        .where("password", "==", userDetails.password)
        .get();

      if (!doctorRef.empty) {
        setDoctorData(doctorRef.docs[0]);
      } else {
        setDoctorData(null);
      }
    };

    if (userDetails.email && userDetails.password) {
      fetchDoctorData();
    }
  }, [userDetails]);

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
    e.preventDefault();

    if (doctorData) {
      console.log(doctorData)
      navigate(`/${category}`)

    } else {
      alert("Invalid email or password for Doctor account.");
    }
   
      

  }
  return (
    <> {
      <div className="container login-container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <Category user={category} onChangeHandler={onChangeCategoryHandler} />
            <div className="my-4">
              <LoginForm userDetail={userDetails} onSubmit={onSubmit} onChangeHandler={onChangeLoginFormHandler} />
            </div>
          </div>
        </div>
      </div>

    }
      
    </>
  );
};
export default Login;
