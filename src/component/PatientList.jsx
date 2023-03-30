import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import firebase from "../firebase";
import "firebase/firestore";
const db = firebase.firestore();
const PatientsList = () => {
  const location = useLocation();
  const path = location.pathname;
  const [patients, setPatients] = useState([]);
  const handleVerifyClick = (patient) => {
    // update patient data in firebase
    db.collection("Patient").doc(patient.id).update({
      authorized: true,
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("Patient").onSnapshot((snapshot) => {
      const patientsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(JSON.stringify(patientsData));
      setPatients(patientsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Patients List</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>healthCardNo</th>
                <th>phoneNumber</th>
                {path === "/staff" && <th>Verify</th>}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>{patient.firstName}</td>
                  <td>{patient.healthCardNo}</td>
                  <td>{patient.phoneNumber}</td>
                  {path === "/staff" && (
                    <td>
                      {patient.authorized === false ? (
                        <Button onClick={() => handleVerifyClick(patient)}>
                          Verify
                        </Button>
                      ) : (
                        <Button disabled>Verified</Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientsList;
