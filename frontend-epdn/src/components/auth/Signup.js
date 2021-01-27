import React, { useState } from 'react'
import './auth.css';
import PropTypes from 'prop-types';
import { signupUserApi } from './AuthApi';
import { setLocalToken } from './RemeberMe';

export default function Signup({ setToken, setShowLogin }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [remeberMe, setRemeberMe] = useState({ checked: false });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");

        const token = await signupUserApi({
            username,
            password
        });

        if (token) {
            if (remeberMe.checked) {
                setLocalToken({ "username": token.username, "password": token.password })
            }
            setToken(token);
        } else {
            setError("Username already used");
        }

    }

    return (
        <div className="login-wrapper">
            <div className="container">
                <h1 className="title">Sign up</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username :</p>
                        <input type="text" className="inputs" value={username} onChange={e => setUserName(e.target.value)} required />
                    </label>
                    <label>
                        <p>Email :</p>
                        <input type="email" className="inputs" value={email} onChange={e => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <p>Password :</p>
                        <input type="password" className="inputs" value={password} onChange={e => setPassword(e.target.value)} required />
                    </label>
                    <div>
                        <label>
                            <p>
                                Remeber me :
                        <input type="checkbox" checked={remeberMe.checked} onChange={e => setRemeberMe({ checked: !remeberMe.checked })} />
                            </p>
                        </label>
                    </div>
                    <div className="button-container">
                        <button className="button" type="submit">Login</button>
                    </div>
                </form>

                {
                    error &&
                    <div className="error-container">
                        <p className="error">{error}</p>
                    </div>
                }
            </div>
            <button className="top-button" onClick={e => { setShowLogin(true) }}>Login</button>
        </div>
    )
}

Signup.propTypes = {
    setToken: PropTypes.func.isRequired
}
