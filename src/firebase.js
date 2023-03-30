import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyC4vSPek3SkRIsTS1vfV_dtSN6ZAWqzsGQ",
  authDomain: "healthmanagment-1e53b.firebaseapp.com",
  databaseURL: "https://healthmanagment-1e53b-default-rtdb.firebaseio.com",
  projectId: "healthmanagment-1e53b",
  storageBucket: "healthmanagment-1e53b.appspot.com",
  messagingSenderId: "674389399536",
  appId: "1:674389399536:web:01cab825d713cf8e7fef35",
  measurementId: "G-N2F1W20W6L"
};


firebase.initializeApp(firebaseConfig);

export default firebase;