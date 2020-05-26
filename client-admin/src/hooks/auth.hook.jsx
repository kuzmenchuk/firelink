import { useState, useCallback, useEffect } from 'react'

import { useHttp } from './http.hook';

const storageName = 'userData'

export const useAuth = () => {
    const { loading, request, error, clearError } = useHttp(); // request to server hook
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [])

    const logout = useCallback(async () => {
        try {
            await request('/api/auth/logout', 'POST');
            // showToast(data.message, false);
            setToken(null);
            setUserId(null);
            localStorage.removeItem(storageName)
        } catch (error) {
            // showToast(error.message)
            clearError()
        }
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId, data.card)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}