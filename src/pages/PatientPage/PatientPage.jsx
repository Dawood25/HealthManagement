import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ShowPrescription from "../../component/ShowPrescription";
import ShowLabTest from "../../component/ShowLabTest";
import AddLabTest from "../../component/AddLabTest";
import { useLocation } from "react-router-dom";
import firebase from "../../firebase";
import AddPrescription from "../../component/AddPrescription";
import { FaPrescription, FaFlask } from "react-icons/fa";
import moment from "moment";
import emailjs from 'emailjs-com';

function sendMailToDoctor(email){
  emailjs.send("service_aniucmy", 
  "template_coa3u6n", {user_email:"harajmast9009@gmail.com"}, "OlPP9vz--g-QVrLqf")
.then(result => {
console.log('Your message has been sent successfully.');

}, error => {
console.log(error.text);
console.log('Sorry, something went wrong. Please try again later.');
});
}

function PatientPage(props) {
  const db = firebase.firestore();
  console.log("Patient Page");

  // Use object destructuring to simplify state variables
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [showLabTests, setShowLabTests] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Use object destructuring and default values to simplify data retrieval
  const {
    id,
    category,
    data = { prescribtion: [], labTest: [] },
  } = useLocation().state;

  // Use ternary operator to simplify variable assignments
  const isDoctor = category?.includes("Doctor") || false;
  const isStaff = category?.includes("Staff") || false;

  // Use object destructuring to simplify state variables
  const [prescriptions, setPrescriptions] = useState(data.prescribtion);
  const [labTests, setLabTests] = useState(data.labTest);

  const handleShowPrescriptions = () => {
    setShowPrescriptions((prevState) => !prevState);
  };

  const handleShowLabTests = () => {
    setShowLabTests((prevState) => !prevState);
  };
  /*
  const handleAddPrescription = (prescribtion) => {
    console.log("handleAddPrescrtpio");
    console.log(prescribtion);
    setPrescriptions((prevState) => [...prevState, ...prescribtion]);
  };
  */

  const onSubmitPrescription = (event) => {
    event.preventDefault();
    console.log("onSubmitPrescribtion");

    // Use object destructuring to simplify variable assignments
    const [date, doctorName, prescription, suggestTest, note] =
      event.target.elements;
    const updatedPresc = [
      ...prescriptions,
      {
        date: date.value,
        doctorName: doctorName.value,
        prescription: prescription.value,
        suggestTest: suggestTest.value,
        note: note.value,
      },
    ];
    db.collection("Patient")
      .doc(id)
      .update({
        prescribtion: updatedPresc,
      })
      .then(() => {
        console.log("Prescription updated successfully");
        setPrescriptions(updatedPresc);
      })
      .catch((error) => {
        console.log("Error updating Prescription: ", error);
      });

    // Clear form inputs after submission
    event.target.reset();
  };
  const [fromDate, setFromDate] = useState("1880-01-01");
  const [toDate, setToDate] = useState("2099-12-30");

  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const onSubmitLabTest = (event) => {
    const testId = event.target.elements[0].value;
    const testName = event.target.elements[1].value;
    const testResult = event.target.elements[2].value;
    const testDate = event.target.elements[3].value;
    const normalRange = event.target.elements[4].value;

    const updatedLabTests = [
      ...labTests,
      { testId, testName, testResult, testDate, normalRange },
    ];

    if(isNaN(normalRange)) {
      if(normalRange !== testResult){
        sendMailToDoctor("harajmast9009@gmail.com")
      }
    }
    else{
      if(testResult > normalRange || testResult < normalRange){
        sendMailToDoctor("harajmast9009@gmail.com")
      }
    }

    db.collection("Patient")
      .doc(id)
      .update({ labTest: updatedLabTests })
      .then(() => {
        console.log("Lab Test updated successfully");
        setLabTests(updatedLabTests);
      })
      .catch((error) => console.log("Error updating Lab Test:", error));
  };

  const handleDeleteLabTest = (event) => {
    const idToRemove = event.target.parentElement.children[0].textContent;
    const updatedTests = labTests.filter((test) => test.testId !== idToRemove);

    db.collection("Patient")
      .doc(id)
      .update({ labTest: updatedTests })
      .then(() => {
        console.log("Lab Test updated successfully");
        setLabTests(updatedTests);
      })
      .catch((error) => console.log("Error updating Lab Test:", error));
  };

  if (!data.authorized) {
    return alert("You are not verified yet. Please login after 24 hours.");
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h3 className="text-center mb-4">
            Number of Visits:
            {
              prescriptions.filter((prescription) => {
                return prescription.doctorName !== "";
              }).length
            }
          </h3>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            value={fromDate}
            onChange={handleFromDateChange}
          />
          <br></br>
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            value={toDate}
            onChange={handleToDateChange}
          />
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <div className="d-flex align-items-center">
            <FaPrescription size={28} className="me-2" />
            <h4 className="mb-0">Prescriptions</h4>
          </div>
          <ShowPrescription
            handleShowPrescriptions={handleShowPrescriptions}
            prescriptions={prescriptions.filter((prescription) =>
              moment(prescription.date).isBetween(fromDate, toDate)
            )}
            showPrescriptions={showPrescriptions}
            isLoggedIn={isLoggedIn}
            setShowPrescriptions={setShowPrescriptions}
            setIsLoggedIn={setIsLoggedIn}
          />
          {isDoctor && <AddPrescription onSubmit={onSubmitPrescription} />}
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center">
            <FaFlask size={28} className="me-2" />
            <h4 className="mb-0">Lab Tests</h4>
          </div>
          <ShowLabTest
            handleShowLabTests={handleShowLabTests}
            labTests={labTests.filter((labTest) =>
              moment(labTest.testDate).isBetween(fromDate, toDate)
            )}
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
