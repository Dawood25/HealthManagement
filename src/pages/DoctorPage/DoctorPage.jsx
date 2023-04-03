import React,{useEffect,useState} from "react";
import PatientsList from "../../component/PatientList";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const DoctorPage = (props) => {
  const navigate = useNavigate();

  const location = useLocation().state 
 

  return (
    <div>
           <PatientsList />
     </div>
  )

};

export default DoctorPage;
