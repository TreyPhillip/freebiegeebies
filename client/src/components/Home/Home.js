import axios from 'axios';
import React, { useState } from "react";

export default function Home() {
    const [data, setData] = useState(null);
    const getUser = () => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:8080/user",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    }
    return(
        <div>
            <h1>Get User</h1>
            <button onClick={getUser}>Submit</button>
            {data ? <h1>Welcome Back {data.username}</h1> : null}
        </div>
    );
};