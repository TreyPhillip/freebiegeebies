import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

export default function NavBar (props) {

    const logOut = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/logout",
        }).then((res) => {
            if (res.data === "Successfully Logged Out") {
                props.setIsAuth(false);
            }
            console.log(res.data)
        });
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    FG
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="dropdownMenuButton" href="# " data-toggle="dropdown" aria-expanded="false">
                            Discover
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link to="/images" className="dropdown-item">
                                    Images
                                </Link>
                            </li>
                        </ul>
                    </li>
                </div>
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                    {props.isAuth ?
                        <div className="navbar-nav ml-auto ">
                            <li className="nav-item dropdown navbar-logged">
                                <a className="nav-link dropdown-toggle" id="dropdownMenuButton" href="# "data-toggle="dropdown" aria-expanded="false">
                                    {props.data.user_image_url ?
                                    <img src={props.data.user_image_url} alt="profile" className="profile-image"/>
                                    :
                                    <img src='' alt="profile" className="profile-image"/>
                                    }
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <Link to="/Upload" className="dropdown-item">
                                            Upload
                                        </Link>
                                    </li>
                                    <li><a className="dropdown-item" href="# ">Another action</a></li>
                                    <li><a onClick={logOut} className="dropdown-item" href="# ">Log Out</a></li>
                                </ul>
                            </li>
                        </div>
                    : 
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
                        </div>
                    }
            </div>
        </nav>
    )
}