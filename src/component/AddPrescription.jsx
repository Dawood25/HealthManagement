import React from "react";
import { Button, Form } from "react-bootstrap";

const AddPrescription = (props) => {
  const handleAddPrescription = (event) => {
    event.preventDefault();
    props.handleAddPrescription(event);
  };
  return (
    <div>
      <h3>Add Prescription</h3>
      <Form onSubmit={handleAddPrescription}>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" />
        </Form.Group>
        <Form.Group controlId="formMedicine">
          <Form.Label>Medicine</Form.Label>
          <Form.Control type="text" name="medicine" />
        </Form.Group>
        <Form.Group controlId="formDoctorId">
          <Form.Label>Doctor ID</Form.Label>
          <Form.Control type="text" name="doctorId" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Prescription
        </Button>
      </Form>
    </div>
  );
};

export default AddPrescription;
