import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { useState } from 'react';


function App() {
   const [loggedInUser,setLoggedInUser] = useState(false)
  return (
    <div className="App">
       <Router>
   
        
        <Switch>
          <Route exact path="/register">
            <Register></Register>
          </Route>
          <Route setLoggedInUser={setLoggedInUser} path="/login">
            <Login></Login>
           
          </Route>
          <Route exact path="/">
            {
               loggedInUser ? <Home/> : <  Login setLoggedInUser={setLoggedInUser} /> 
            }
          </Route>
         
        </Switch>
    
    </Router>
     
    </div>
  );
}

export default App;
