import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";

const ShowPrescription = (props) => {
  const prescriptions = props.prescriptions;
  console.log("Show Prescipton");
  console.log(props.prescriptions);
  const isLoggedIn = props.isLoggedIn;
  const showPrescriptions = true;

  const handleShowPrescriptions = () => {
    props.handleShowPrescriptions();
  };

  return (
    <Row>
      <Col>
        {/* <Button onClick={handleShowPrescriptions}>
          {showPrescriptions ? "Hide Prescriptions" : "View Prescriptions"}
        </Button> */}
        {isLoggedIn && showPrescriptions && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Doctor Name</th>
                <th> Prescription</th>
                <th>Suggested Lab Test </th>
                <th>Doctor Notes </th>
              </tr>
            </thead>
            <tbody>
              {prescriptions &&
                prescriptions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.doctorName}</td>
                    <td>{item.prescription}</td>
                    <td>{item.suggestTest}</td>
                    <td>{item.note}</td>
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
