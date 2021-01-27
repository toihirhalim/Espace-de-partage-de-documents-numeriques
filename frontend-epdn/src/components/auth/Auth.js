import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function Auth({ setToken }) {
    const [showLogin, setShowLogin] = useState(true);

    if (showLogin) {
        return <Login setToken={setToken} setShowLogin={setShowLogin} />
    }

    return <Signup setToken={setToken} setShowLogin={setShowLogin} />
}
