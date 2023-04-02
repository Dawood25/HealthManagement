import React from "react";
import { Button, Form } from "react-bootstrap";
const AddLabTest = (props) => {
  const handleAddLabTest = (event) => {
    event.preventDefault();
    props.handleAddLabTest(event);
  };

  return (
    <div>
      <h3>Add Lab Test</h3>
      <Form onSubmit={handleAddLabTest}>
        <Form.Group controlId="formTestId">
          <Form.Label>Test ID</Form.Label>
          <Form.Control type="text" name="testId" />
        </Form.Group>
        <Form.Group controlId="formTestName">
          <Form.Label>Test Name</Form.Label>
          <Form.Control type="text" name="testName" />
        </Form.Group>
        <Form.Group controlId="formTestResult">
          <Form.Label>Test Result</Form.Label>
          <Form.Control type="text" name="testResult" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Lab Test
        </Button>
      </Form>
    </div>
  );
};

export default AddLabTest;
