import { useState } from "react";

export const Auth = () => {
    return (
    <div className="auth">
        <Login />
        <Register />
    </div>
    );
};

const Login = () => {

};

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return ( 
    <div>
        <h2> Register </h2>
        <div className="form-group">
            <label htmlFor="username"> Username: </label>
            <input 
                type="text" 
                id="username"
                value={username} 
                onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div className="form-group">
            <label htmlFor="password"> Password: </label>
            <input 
                type="text" 
                id="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)}/>
        </div>
    </div>
    );
};