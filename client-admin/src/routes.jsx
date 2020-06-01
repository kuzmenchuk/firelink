import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import AdminPage from './pages/AdminPage';
import LinkPage from './pages/link-page/link-page';

import MainMenu from './pages/admin/main-menu';
import About from './pages/admin/profile';
import Design from './pages/admin/design';
import Links from './pages/admin/links';
import SingleLink from './pages/admin/single-link';
import Messengers from './pages/admin/messengers';
import Products from './pages/admin/products';
import SingleProduct from './pages/admin/single-product';

import LogIn from './pages/login';
import SignUp from './pages/signup';


export const useRoutes = (isAuth) => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/profile">
                    <AdminPage />
                </Route>
                <Route path="/:id">
                    <LinkPage />
                </Route>
                <Redirect to="/profile" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact>
                <LogIn />
            </Route>
            <Route path="/signup" exact>
                <SignUp />
            </Route>
            <Route path="/:id">
                <LinkPage />
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
            <Route path="/profile/links/:id">
                <SingleLink />
            </Route>
            <Route path="/profile/m" exact>
                <Messengers />
            </Route>
            <Route path="/profile/products" exact>
                <Products />
            </Route>
            <Route path="/profile/products/:id">
                <SingleProduct />
            </Route>
            <Redirect to="/profile" />
        </Switch>
    )
}