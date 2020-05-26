import React from 'react';
import { Spinner } from '@blueprintjs/core';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';


function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuth = !!token;

  const routes = useRoutes(isAuth);

  if (!ready) return <Spinner intent='none' size={70} />


  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
