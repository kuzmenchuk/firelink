import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminPage from './pages/AdminPage';

import MainMenu from './pages/admin/main-menu';
import About from './pages/admin/profile';
import Design from './pages/admin/design';
import Links from './pages/admin/links';
import Messengers from './pages/admin/messengers';
import Products from './pages/admin/products';

import AuthPage from './pages/AuthPage';


export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/profile">
                    <AdminPage />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <AuthPage />
            </Route>
            <Route path="/signup" exact>
                <AuthPage signup />
            </Route>
            <Redirect to="/login" />
        </Switch>
    )
}

export const adminRoutes = () => {
    return (
        <Switch>
            <Route path="/profile" exact>
                <MainMenu />
            </Route>
            <Route path="/profile/about" exact>
                <About />
            </Route>
            <Route path="/profile/design" exact>
                <Design />
            </Route>
            <Route path="/profile/links" exact>
                <Links />
            </Route>
            <Route path="/profile/m" exact>
                <Messengers />
            </Route>
            <Route path="/profile/products" exact>
                <Products />
            </Route>
            <Redirect to="/profile" />
        </Switch>
    )
}