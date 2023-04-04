
import React,{useEffect,useState} from "react";
import PatientsList from "../../component/PatientList";
import firebase from "../../firebase";
import { useLocation} from "react-router-dom";





export const Staff = (props) => {
 
  const db = firebase.firestore();
  const { id, category, data } = useLocation().state;
  console.log("id and category is " + id + " " + category);
  const [patients, setPatients] = useState([]);
  const handleVerifyClick = (patient) => {
    // Update patient data in Firebase
    const patientRef = db.collection("Patient").doc(patient.id);

    patientRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const currentAuthorizedValue = doc.data().authorized;
          patientRef.update({
            authorized: !currentAuthorizedValue,
          });
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
        ...doc.data(),
      }));
      console.log(JSON.stringify(patientsData));
      setPatients(patientsData);
    });
    return () => unsubscribe();
  }, []);

 
  return (
    <div>
           <PatientsList handleVerifyClick={handleVerifyClick} path={category} patients={patients} />
     </div>
  )
};
