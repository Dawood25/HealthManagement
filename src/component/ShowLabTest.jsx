import React from "react";
import { Row, Col, Table, Button } from "react-bootstrap";

const ShowLabTest = (props) => {
  const labTests = props.labTests;
  const isLoggedIn = props.isLoggedIn;
  const showLabTests = props.showLabTests;
  const handleShowLabTests = () => {
    props.handleShowLabTests();
  };

  const setShowLabTests = (flag) => {
    props.setShowLabTests(flag);
  };

  return (
    <Row>
      <Col>
        <Button onClick={handleShowLabTests}>
          {showLabTests ? "Hide Lab Tests" : "View Lab Tests"}
        </Button>
        {showLabTests && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Test Name</th>
                  <th>Test Result</th>
                </tr>
              </thead>
              <tbody>
                {labTests.map((labTest, index) => (
                  <tr key={index}>
                    <td>{labTest.testId}</td>
                    <td>{labTest.test.testName}</td>
                    <td>{labTest.test.testResult}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ShowLabTest;
