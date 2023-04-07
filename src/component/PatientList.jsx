import React from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const PatientsList = ({ handleVerifyClick, path, patients }) => {
  console.log(patients);

  console.log(path);

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
                {path === "Staff" && <th>Verify</th>}
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link
                      to={patient.data.authorized ? "/patient" : "#"}
                      state={{
                        category: path,
                        id: patient.id,
                        data: patient.data,
                      }}
                    >
                      {patient.data.firstName}
                    </Link>
                  </td>
                  <td>{patient.data.healthCardNo}</td>
                  <td>{patient.data.phoneNumber}</td>
                  {path === "Staff" && (
                    <td>
                      {patient.data.authorized === false ? (
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
