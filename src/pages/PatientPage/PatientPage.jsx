import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ShowPrescription from "../../component/ShowPrescription";
import ShowLabTest from "../../component/ShowLabTest";
import AddLabTest from "../../component/AddLabTest";
import AddItemsComponet from "../../component/AddItemComponet";
import { useLocation } from "react-router-dom";
import firebase from "../../firebase";

function PatientPage(props) {
  const db = firebase.firestore();
  console.log("Patient Page");
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showLabTests, setShowLabTests] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id, category, data } = useLocation().state;

  const isDoctor = category == null ? false : category.includes("Doctor");
  const isStaff = category == null ? false : category.includes("Staff");
  const isPatient = category == null ? false : category.includes("patient");
  console.log(data);
  const [prescriptions, setPrescriptions] = useState(data.prescribtion);
  const [labTests, setLabTests] = useState(data.labTest || []);

  const handleShowPrescriptions = () => {
    setShowPrescriptions(!showPrescriptions);
  };

  const handleShowLabTests = () => {
    setShowLabTests(!showLabTests);
  };

  const handleAddPrescription = (prescribtion) => {
    console.log("handleAddPrescrtpio");
    console.log(prescribtion);
    setPrescriptions([...prescribtion]);

    console.log(prescriptions);
  };

  const onSubmitPrescribtion = () => {
    console.log("onSubmitPrescribtion");
    db.collection("Patient")
      .doc(id)
      .update({
        prescribtion: prescriptions,
      })
      .then(() => {
        console.log("Prescription updated successfully");
      })
      .catch((error) => {
        console.log("Error updating prescription: ", error);
      });
  };
  const onSubmitLabTest = (event) => {
    console.log("onSubmitLabTest " + labTests);
    let testId = event.target.elements[0].value;
    let testName = event.target.elements[1].value;
    let testResult = event.target.elements[2].value;

    db.collection("Patient")
      .doc(id)
      .update({
        labTest: [
          ...labTests,
          { testId: testId, testName: testName, testResult: testResult },
        ],
      })
      .then(() => {
        console.log("Lab Test updated successfully");
        setLabTests([
          ...labTests,
          { testId: testId, testName: testName, testResult: testResult },
        ]);
      })
      .catch((error) => {
        console.log("Error updating Lab Test: ", error);
      });
  };
  const handleDeleteLabTest = (event) => {
    console.log(event);
    let idToRemove = event.target.parentElement.children[0].textContent;
    let updatedTests = labTests.filter((test) => test.testId != idToRemove);
    db.collection("Patient")
      .doc(id)
      .update({
        labTest: updatedTests,
      })
      .then(() => {
        console.log("Lab Test updated successfully");

        setLabTests(updatedTests);
      })
      .catch((error) => {
        console.log("Error updating Lab Test: ", error);
      });
  };
  if (!data.authorized) {
    return alert("You are not verified Yet, Please Login After 24 hr");
  }
  return (
    <Container>
      <h3>Number of visits: 4</h3>
      <Row>
        <Col lg={6}>
          <ShowPrescription
            handleShowPrescriptions={handleShowPrescriptions}
            prescriptions={prescriptions}
            showPrescriptions={showPrescriptions}
            isLoggedIn={isLoggedIn}
            setShowPrescriptions={setShowPrescriptions}
            setIsLoggedIn={setIsLoggedIn}
          />
          {isDoctor && (
            <AddItemsComponet
              onSelect={handleAddPrescription}
              items={prescriptions}
              onSubmit={onSubmitPrescribtion}
            />
          )}
        </Col>
        <Col lg={6}>
          <ShowLabTest
            handleShowLabTests={handleShowLabTests}
            labTests={labTests}
            showLabTests={showLabTests}
            isLoggedIn={isLoggedIn}
            setShowLabTests={setShowLabTests}
            setIsLoggedIn={setIsLoggedIn}
            handleDeleteLabTest={handleDeleteLabTest}
          />
          {isStaff && <AddLabTest onSubmit={onSubmitLabTest} />}
        </Col>
      </Row>
    </Container>
  );
}

export default PatientPage;
