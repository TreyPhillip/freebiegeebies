import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import ImageList from "../../components/Images/imgageList";
import Home from "../../components/Home/Home";
import Register from "../../components/Register/Register";
import Login from "../../components/Login/Login";
import sampleImage from '../../assets/images/trey-compressed.jpg';
import axios from 'axios';

export default function NavBar () {

    const logOut = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/logout",
        })
    }

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        FG
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Discover
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link to="/images" className="dropdown-item">
                                    Images
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/add" className="dropdown-item">
                                    Add Image
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </div>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img src={sampleImage} className="profile-image"/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <li><a className="dropdown-item">Action</a></li>
                                <li><a className="dropdown-item">Another action</a></li>
                                <li><a onClick={logOut} className="dropdown-item">Log Out</a></li>
                            </ul>
                        </li>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route exact path="/" component={Home}/>
                <Route path="/images" component={ImageList}/>
                <Route path="/Login" component={Login}/>
                <Route path="/signup" component={Register}/>
            </Switch>
        </Router>
    )
}