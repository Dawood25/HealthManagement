import logo from './logo.svg';
import './App.css';
import { Navbar } from './component/Navbar';
import { Login } from './component/Login';

function App() {
  return (
    <div className="App container">
      <Navbar/>
      <Login/>
    </div>
  );
}

export default App;
