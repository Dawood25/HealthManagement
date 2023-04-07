import React from "react";
import { Row, Col, Table } from "react-bootstrap";

const ShowLabTest = (props) => {
  const labTests = props.labTests;
  const showLabTests = true;


  const handleDeleteLabTest = (event) => {
    event.preventDefault();
    props.handleDeleteLabTest(event);
  };

  return (
    <Row>
      <Col>
        {/* <Button onClick={handleShowLabTests}>
          {showLabTests ? "Hide Lab Tests" : "View Lab Tests"}
        </Button> */}
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
                {labTests &&
                  labTests.map((labTest, index) => (
                    <tr key={index}>
                      <td>{labTest.testId}</td>
                      <td>{labTest.testName}</td>
                      <td>{labTest.testResult}</td>
                      <td onClick={handleDeleteLabTest}>Delete Test</td>
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
