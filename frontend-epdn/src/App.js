import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Acceuil from './components/dashboard/Acceuil'
import useToken from './components/auth/useToken';
import Auth from './components/auth/Auth';

function App() {
  const { token, setToken, logout } = useToken();

  if (!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/acceuil">
            <Acceuil />
          </Route>
          <Route path="/">
            <h2>default page</h2>
          </Route>
        </Switch>
      </BrowserRouter>
      <button className="logout-btn" onClick={logout}>Log Out</button>
    </div>
  );
}

export default App;
