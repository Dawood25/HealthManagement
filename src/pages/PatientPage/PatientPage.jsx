import React, { useState} from "react";
import { Row, Col, Container } from "react-bootstrap";
import ShowPrescription from "../../component/ShowPrescription";
import ShowLabTest from "../../component/ShowLabTest";
import AddLabTest from "../../component/AddLabTest";
import AddItemsComponet from "../../component/AddItemComponet";
import { useLocation } from "react-router-dom";
import firebase from "../../firebase";

function PatientPage(props) {
  const db = firebase.firestore();
  console.log("Patient Page")
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showLabTests, setShowLabTests] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { id, category, data } = useLocation().state;
  
  const isDoctor = category == null ? false : category.includes("Doctor");
  const isStaff = category == null ? false : category.includes("staff");

  const [prescriptions, setPrescriptions] = useState(data.prescribtion);
  const [labTests, setLabTests] = useState(data.labTest);

  const handleShowPrescriptions = () => {
    setShowPrescriptions(!showPrescriptions);
  };

  const handleShowLabTests = () => {
    setShowLabTests(!showLabTests);
  };

  const handleAddPrescription = (prescribtion) => {
    console.log("handleAddPrescrtpio")
       console.log(prescribtion)
    setPrescriptions([
      ...prescribtion,   
    ]);

    console.log(prescriptions);
  
  };

  const onSubmitPrescribtion = () => {
    console.log("onSubmitPrescribtion");
    db.collection('Patient')
    .doc(id)
    .update({
      "prescribtion": prescriptions
    })
    .then(() => {
      console.log("Prescription updated successfully");
    })
    .catch((error) => {
      console.log("Error updating prescription: ", error);
    });

  }

  const handleAddLabTest = (event) => {
    event.preventDefault();
    const testId = event.target.testId.value;
    const testName = event.target.testName.value;
    const testResult = event.target.testResult.value;
    setLabTests([
      ...labTests,
      { testId: testId, tests : { testName: testName, testResult: testResult} },
    ]);
    event.target.reset();
  };

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
            <AddItemsComponet onSelect = {handleAddPrescription} items={prescriptions} onSubmit={onSubmitPrescribtion} />
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
          />
          {isStaff && <AddLabTest handleAddLabTest={handleAddLabTest} />}
        </Col>
      </Row>
    </Container>
  );
}

export default PatientPage;
