import {useState} from 'react';
import axios from 'axios';

export default function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("");
    const login = () => {
        axios({
            method: "POST",
            data: {
                user_email: loginEmail,
                user_password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:8080/login"
        }).then((res) => console.log(res));
    };

    return (
        <div>
            <label>
                Email:
                <input 
                    type="text" 
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                />
            </label><br/>
            <label>
                Password:
                <input 
                    type="password" 
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                />
            </label><br/>
            <button onClick={login}>Submit</button>
        </div>
    );
}