import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import PatientsList from "../../component/PatientList";
import {useLocation} from 'react-router-dom';




export const Staff = (props) => {
  const location = useLocation();
  console.log(location);
  return <PatientsList />;
};
