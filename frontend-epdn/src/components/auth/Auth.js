import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ setToken }) {
    const [showLogin, setShowLogin] = useState(true);

    return showLogin
        ? <Login setToken={setToken} setShowLogin={setShowLogin} />
        : <Signup setToken={setToken} setShowLogin={setShowLogin} />

}
