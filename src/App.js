import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { AppProvider } from "./Components/Helper/AppContext";
import AxiosHelper from './Components/Helper/AxiosHelper';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserHello from './Components/UserHello';
import Axios from "axios";


function App() {

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/login' },
    { name: 'Logout', url: '/logout' },
    { name: 'User Hello', url: '/userhello'}
  ]

  const [token, setToken] = useState('');

  const logoutHelper = () => {
    sessionStorage.clear();
    setToken('');
  }

  const logout = () => {
    AxiosHelper({ method: 'post', route: '/logout', fun: logoutHelper, token })
  }

  useEffect(() => {
    let sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, [])

  return (
    <Router>
      <AppProvider value={{ token, setToken, pages, logout }}>
        <div className="container">
          <Navbar />
          <div className="my-5">
            <div className="col-7">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/userhello">
                  <UserHello />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;
