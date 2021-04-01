import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import ImageList from "./components/Images/imgageList";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import './App.css';

export default function App() {
  document.title = 'freebiegeebies';

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/images" className="nav-link">
                Images
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add Image
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </div>
        </nav>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Route path="/images" component={ImageList}/>
          <Route path="/Login" component={Login}/>
          <Route path="/signup" component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}