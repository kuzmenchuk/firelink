import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

import { InputGroup, Tooltip, Button, Intent } from '@blueprintjs/core';

import './auth-page.scss';
import { AuthContext } from '../context/AuthContext';


function AuthPage(props) {
    const { showToast } = useMessage()
    const { loading, request } = useHttp()
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
            showToast(data.message, 'success')
        } catch (error) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            showToast(data.message, 'success');

            auth.login(data.token, data.userId)
        } catch (error) { }
    }

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
                <Button
                    type="submit"
                    className="bp3-button bp3-large"
                    loading={loading}
                    onClick={isLoginPage ? loginHandler : registerHandler}
                >
                    {isLoginPage ? 'Zaloguj się' : 'Zarejestruj się'}
                </Button>
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