import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppToaster } from '../components/Toaster';
import { useHttp } from '../hooks/http.hook';

import { InputGroup, Tooltip, Button, Intent } from '@blueprintjs/core';

import './auth-page.scss';
import { AuthContext } from '../context/AuthContext';

function showToastError(msg, error = true) {
    if (error) {
        return AppToaster.show({ message: msg, intent: Intent.WARNING, icon: "warning-sign" });
    }
    AppToaster.show({ message: msg, intent: Intent.SUCCESS, icon: "tick" });
}


function AuthPage(props) {
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoginPage, setIsLoginPage] = useState(!props.signup)

    const auth = useContext(AuthContext)

    const handleLockClick = () => setShowPassword(!showPassword)
    const lockButton = () => (
        <Tooltip content={`${showPassword ? "Schowaj" : "Pokaż"} hasło`} >
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                minimal={true}
                onClick={handleLockClick}
            />
        </Tooltip>
    );

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            showToastError(data.message, false)
        } catch (error) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            showToastError(data.message, false);

            auth.login(data.token, data.userId)
        } catch (error) { }
    }

    useEffect(() => {
        if (error) {
            showToastError(error)
            clearError()
        }
    }, [error])

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLoginPage ? 'Zaloguj się na koncie' : 'Zarejestruj się'}</h2>
                <InputGroup
                    large={true}
                    placeholder="Podaj swój email..."
                    type='email'
                    name="email"
                    value={form.email}
                    onChange={changeHandler}
                />
                <br />
                <InputGroup
                    large={true}
                    placeholder="Podaj swoje hasło..."
                    rightElement={lockButton()}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={changeHandler}
                />
                <br />
                <button
                    type="submit"
                    className="bp3-button bp3-large"
                    onClick={isLoginPage ? loginHandler : registerHandler}
                >
                    {isLoginPage ? 'Zaloguj się' : 'Zarejestruj się'}
                </button>
                <div>
                    <Link
                        className="auth-boolean"
                        to={isLoginPage ? '/signup' : '/login'}
                        onClick={() => setIsLoginPage(!isLoginPage)}
                    >
                        {!isLoginPage ? 'Zaloguj się' : 'Zarejestruj się'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;