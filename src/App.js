import {
  BrowserRouter as Router,
  Routes as Switch,
  Route
} from "react-router-dom";
import './App.css';
import { Navbar } from './component/Navbar';
import Home from './pages/Home/Home'
import PatientRegistrationForm from "./pages/PatientRegistrationForm/PatientRegistrationForm";
import 'bootstrap/dist/css/bootstrap.min.css';
/*

<Home/>
*/
function App() {
  return (
    <div className="App container">
      <Navbar/>
      <Router>
      <Switch>
          <Route path="/">
            <Route index element={<Home />} />  
            <Route path="patient_reg" element={<PatientRegistrationForm />} />
          </Route>
        </Switch>
     </Router>
    </div>
  );
}

export default App;
