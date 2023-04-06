
import React,{useEffect,useState} from "react";
import PatientsList from "../../component/PatientList";
import firebase from "../../firebase";
import { useLocation} from "react-router-dom";
import emailjs from 'emailjs-com';


export const Staff = (props) => {
 
  const db = firebase.firestore();
  const {  category } = useLocation().state;
  //console.log("id and category is " + id + " " + category);
  const [patients, setPatients] = useState([]);
  const handleVerifyClick = (patient) => {
    // Update patient data in Firebase
    const patientRef = db.collection("Patient").doc(patient.id);

    patientRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data())
          const currentAuthorizedValue = doc.data().authorized;
          patientRef.update({
            authorized: !currentAuthorizedValue,
          });
          /*
          if(currentAuthorizedValue) 
            emailjs.send("SERVICE ID", 
            "TEMPLATEID", {user_email:doc.data().email}, "ONEMOREID-")
        .then(result => {
          alert('Your message has been sent successfully.');
          e.target.reset();
        }, error => {
          console.log(error.text);
          alert('Sorry, something went wrong. Please try again later.');
        });*/
        } else {
          console.log("Patient document does not exist");
        }
      })
      .catch((error) => {
        console.log("Error getting patient document:", error);
      });
  };
  useEffect(() => {
    const unsubscribe = db.collection("Patient").onSnapshot((snapshot) => {
      const patientsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        data:doc.data(),
      }));
      //console.log(JSON.stringify(patientsData));
      setPatients(patientsData);
    });
    return () => unsubscribe();
  }, [db]);

 
  return (
    <div>
           <PatientsList handleVerifyClick={handleVerifyClick} path={category} patients={patients} />
     </div>
  )
};
