import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { useAuth0 } from "@auth0/auth0-react";
import './App.css';
import configData from "./config.json";

function App() {
  const {
    isLoading,
    error,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: configData.audience,
          scope: configData.scope,
        });
        setAccessToken(token);
      } catch (e) {
        console.log(e.message);
      }
    };

    if (isAuthenticated) {
      getAccessToken();
    }
  }, [getAccessTokenSilently, isAuthenticated]);

  const securedAPITest = async () => {
    console.log("Testing API");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <code>React</code>
          </p>
          <button onClick={loginWithRedirect}>Log In</button>
        </header>
      </div>
    );
  }

  // User is authenticated
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hi {user.email}, You have successfully logged in.</p>

        <button onClick={securedAPITest}>Test Private API</button>

        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </header>
    </div>
  );
}

export default App;
