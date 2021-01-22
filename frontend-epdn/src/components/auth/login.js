import React, { useState, useEffect } from 'react'
import './login.css'
import PropTypes from 'prop-types';
import { getLocalToken, setLocalToken, deleteLocalToken } from './RemeberMe';
import loginUser from './AuthApi';


export default function Login({ setToken }) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [remeberMe, setRemeberMe] = useState({ checked: false });

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");

        const token = await loginUser({
            username,
            password
        });

        if (token) {
            if (remeberMe.checked) {
                setLocalToken({ "username": token.username, "password": token.password })
            } else {
                deleteLocalToken();
            }
            setToken(token);
        } else {
            setError("Username or Password is invalid !");
        }

    }

    useEffect(() => {
        const LocalToken = getLocalToken();
        if (LocalToken) {
            setUserName(LocalToken.username);
            setPassword(LocalToken.password);
            setRemeberMe({ checked: true })
        }
    }, []);

    return (
        <div className="login-wrapper">
            <div className="container">
                <h1 className="title">Log In</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Username :</p>
                        <input type="text" className="inputs" value={username} onChange={e => setUserName(e.target.value)} required />
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
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}