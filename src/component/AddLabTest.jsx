import React from "react";
import { Button, Form } from "react-bootstrap";
const AddLabTest = (props) => {
  const onSubmitLabTest = (event) => {
    event.preventDefault();
    props.onSubmit(event);
  };

  return (
    <div>
      <h3>Add Lab Test</h3>
      <Form onSubmit={onSubmitLabTest}>
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
        <Form.Group controlId="formTestDate">
          <Form.Label>Test Date</Form.Label>
          <Form.Control type="date" name="testDate" />
        </Form.Group>
        <Form.Group controlId="formNormalRange">
          <Form.Label>Normal Range</Form.Label>
          <Form.Control type="text" name="normalRange" />
        </Form.Group>
        <Button className="m-2 p-1" variant="success" type="submit">
          Add Lab Test
        </Button>
      </Form>
    </div>
  );
};

export default AddLabTest;
