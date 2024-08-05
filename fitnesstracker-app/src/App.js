import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';

function App() 
{
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route exact="true" path="/" element={<Login />}>
          </Route>
          <Route path="/signup" element={<Signup />}>
          </Route>
        </Routes>
      
      </div>
    </Router>
  )
}

export default App;
