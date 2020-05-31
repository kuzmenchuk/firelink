import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

import './app.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuth = !!token;
  const classes = useStyles();

  const routes = useRoutes(isAuth);

  if (!ready) return <div className={classes.root}><LinearProgress /></div>


  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
      <Router>
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
