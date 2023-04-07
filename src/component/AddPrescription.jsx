import React from "react";
import { Button, Form } from "react-bootstrap";
const AddPrescription = (props) => {
  const onSubmitLabTest = (event) => {
    event.preventDefault();
    props.onSubmit(event);
  };

  return (
    <div className="m-3 p-2">
      <h3>Add Prescription</h3>
      <Form onSubmit={onSubmitLabTest}>
      <Form.Group controlId="formTestId">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" />
        </Form.Group>
        <Form.Group controlId="formTestId">
          <Form.Label>Doctor Name</Form.Label>
          <Form.Control type="text" name="doctorName" />
        </Form.Group>
        <Form.Group controlId="formTestName">
          <Form.Label>Prescription</Form.Label>
          <Form.Control type="text" name="prescription" />
        </Form.Group>
        <Form.Group controlId="formTestResult">
          <Form.Label>Suggested Lab Test </Form.Label>
          <Form.Control type="text" name="suggestTest" />
        </Form.Group>
        <Form.Group controlId="doctorNote">
          <Form.Label>Doctor Note</Form.Label>
          <Form.Control type="area" name="doctorNote" />
        </Form.Group>
        <Button className="m-2 p-1"  variant="success" type="submit">
          Add Prescription 
        </Button>
      </Form>
    </div>
  );
};

export default AddPrescription;
