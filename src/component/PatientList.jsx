import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";
import { Link } from "react-router-dom";
const db = firebase.firestore();
const PatientsList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const { id, category } = useParams();
  console.log("id and category is " + id + " " + category);
  const [patients, setPatients] = useState([]);
  const handleVerifyClick = (patient) => {
    // Update patient data in Firebase
    const patientRef = db.collection("Patient").doc(patient.id);

    patientRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentAuthorizedValue = doc.data().authorized;
          patientRef.update({
            authorized: !currentAuthorizedValue,
          });
        } else {
          console.log("Patient document does not exist");
        }
      })
      .catch((error) => {
        console.log("Error getting patient document:", error);
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
  function redirectToPatientPage(id) {
    // Push the patient ID onto the location state and redirect to the patient page
    console.log("patient id is " + id);
    navigate("/patient?id=" + id, { state: [id, path] });
  }
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
                  <td>
                    {/* <a onClick={() => redirectToPatientPage(patient.id)}>
                      {patient.firstName}
                    </a>
                     */}
                    <Link to={`/patient/${patient.id}` + path}>
                      {patient.firstName}
                    </Link>
                  </td>
                  <td>{patient.healthCardNo}</td>
                  <td>{patient.phoneNumber}</td>
                  {path === "/staff" && (
                    <td>
                      {patient.authorized === false ? (
                        <Button
                          variant="success"
                          onClick={() => handleVerifyClick(patient)}
                        >
                          Verify
                        </Button>
                      ) : (
                        <Button
                          variant="fail"
                          onClick={() => handleVerifyClick(patient)}
                        >
                          Verified
                        </Button>
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
