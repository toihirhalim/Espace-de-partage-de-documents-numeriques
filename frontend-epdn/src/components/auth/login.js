import React, { useState } from 'react'
import './login.css'
import PropTypes from 'prop-types';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(json => json.data)
}

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");
        const token = await loginUser({
            username,
            password
        });

        if (token) {
            setToken(token);
        } else {
            setError("Username or Password is invalid, Please verify information before submition.");
        }

    }


    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <label>
                        <p>
                            Remeber me :
                        <input type="checkbox" />
                        </p>
                    </label>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div>
                <p className="error">{error}</p>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}