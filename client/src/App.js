import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageList from "./components/Images/ImgageList";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NavBar from './components/NavBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  document.title = 'freebiegeebies';
  
  const [isAuth, setIsAuth] = useState(false);
  const [data, setData] = useState(null);

  const checkAuthenticated = async () => {
      await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:8080/user/auth",
    }).then((res) => {
      if (res.data === "user is authenticated") {
        setIsAuth(true)
      }
    });
  }

  const getUser = () => {
      axios({
          method: "GET",
          withCredentials: true,
          url: "http://localhost:8080/user",
      }).then((res) => {
      setData(res.data);
      if (res.data) {
        console.log('current user data', res.data);
      }
      else {
        console.log("No Logged User");
      }
      });
  }

  useEffect(() => {
    getUser()
    checkAuthenticated()
  },[isAuth])


  return (
    <Router>
      <NavBar
        data={data}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <div className="App">
        <main>
          <Switch>
              <Route path="/home" component={Home}/>
              <Route exact path="/" component={Home}/>
              <Route path="/images" component={ImageList}/>
              <Route 
                path="/login" 
                render={(props) => (
                  <Login {...props} setIsAuth={setIsAuth} />
                )}
              />
              <Route path="/signup" component={Register}/>
            </Switch>
          </main>
        </div>
      </Router>
  );
}