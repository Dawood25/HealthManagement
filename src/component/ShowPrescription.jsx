import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";

const ShowPrescription = (props) => {
  const prescriptions = props.prescriptions;
  console.log("Show Prescipton");
  console.log(props.prescriptions);
  const isLoggedIn = props.isLoggedIn;
  const showPrescriptions = props.showPrescriptions;

  const handleShowPrescriptions = () => {
    props.handleShowPrescriptions();
  };

  return (
    <Row>
      <Col>
        <Button onClick={handleShowPrescriptions}>
          {showPrescriptions ? "Hide Prescriptions" : "View Prescriptions"}
        </Button>
        {isLoggedIn && showPrescriptions && (
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Medicine</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription, index) => (
                <tr key={index}>
                  <td>{prescription}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};
export default ShowPrescription;
