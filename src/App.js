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
import Image from './Components/Image';
import Axios from "axios";


function Helper() {

  const pages = [
    { name: 'Home', url: '/' },
    { name: 'Login', url: '/login' },
    { name: 'Logout', url: '/logout', user: true },
    { name: 'Profile', url: '/profile/{id}', user: true }
  ]

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({});
  const [images, setImages] = useState([]);

  let history = useHistory();

  const logoutHelper = () => {
    sessionStorage.clear();
    setToken('');
    setUserData({});
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
      AxiosHelper({ method: 'get', route: '/api/user', fun: getUserData, token })
    }
  }, [token]);

  return (
    <AppProvider value={{ token, setToken, userData, pages, logout, images, setImages }}>
      <div className="container">
        <Navbar />
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
          <Route path="/images/:id" children={<Image />} />
        </Switch>
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