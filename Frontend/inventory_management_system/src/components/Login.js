// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
    const [code, setCode] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        onLogin(code); // Pass the code to the validateCode function in App.js
        navigate('/products'); // Redirect to the products page after login
    };

    return (
        <div className="container mt-5">
            <h2>Enter Verification Code</h2>
            <input
                type="password"
                className="form-control mt-3"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={handleLogin}>
                Submit
            </button>
        </div>
    );
}
