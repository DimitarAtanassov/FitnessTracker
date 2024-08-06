import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import Workout from "./components/Workout";
function App() 
{
  return (
    <Router>
      <div className="App">
        
        <Routes>
          
          <Route exact="true" path="/" element={<LoginSignup />}>
          </Route>
          
          <Route path="/signup" element={<Signup />}>
          </Route>
          
          <Route path="/login" element={<Login />}>
          </Route>

          <Route path="/home" element={<Home />}>
          </Route>

          <Route path="/workout" element={<Workout />}>
          </Route>

        </Routes>
      
      </div>
    </Router>
  )
}

export default App;
