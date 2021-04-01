import {useState} from 'react';
import axios from 'axios';

export default function Register() {
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("");
    const register = () => {
        axios({
            method: "POST",
            data: {
                user_email: registerEmail,
                user_password: registerPassword,
                verified: false
            },
            withCredentials: true,
            url: "http://localhost:8080/signup"
        }).then((res) => console.log(res));
    };
    
    return (
        <div>
            <label>
                Email:
                <input 
                    type="text" 
                    value={registerEmail}
                    onChange={e => setRegisterEmail(e.target.value)}
                />
            </label><br/>
            <label>
                Password:
                <input 
                    type="password" 
                    value={registerPassword}
                    onChange={e => setRegisterPassword(e.target.value)}
                />
            </label><br/>
            <button onClick={register}>Submit</button>
        </div>
    );
}