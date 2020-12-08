import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { AppProvider } from "./Components/Helper/AppContext";
import AxiosHelper from './Components/Helper/AxiosHelper';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UserHello from './Components/UserHello';
import Profile from './Components/Profile';
import Axios from "axios";


function Helper() {

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/login' },
    { name: 'Logout', url: '/logout', user: true },
    { name: 'User Hello', url: '/userhello', user: true },
    { name: 'Profile', url: '/profile/{id}', user: true }
  ]

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});

  let history = useHistory();

  const logoutHelper = () => {
    sessionStorage.clear();
    setToken('');
    history.push('/');
  }

  const logout = () => {
    AxiosHelper({ method: 'post', route: '/logout', fun: logoutHelper, token });
  }

  useEffect(() => {
    let sessionToken = sessionStorage.getItem('token');
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, []);

  const getUserData = (res) => {
    setUserData(res.data);
  }

  //checks for token and returns current user data
  useEffect(() => {
    if (token) {
      AxiosHelper({ method: 'get', route: '/api/user', fun: getUserId, token })
    }
  }, [token]);

  return (
    <AppProvider value={{ token, setToken, userData, pages, logout }}>
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
              <Route path="/profile/:id">
                <Profile />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default function App() {
  return (
    <Router >
      <Helper />
    </Router>
  );
}