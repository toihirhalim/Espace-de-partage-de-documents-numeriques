import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/login';
import Acceuil from './components/dashboard/Acceuil'
import useToken from './components/auth/useToken';

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
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
    </div>
  );
}

export default App;
