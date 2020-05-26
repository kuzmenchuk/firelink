import { useState, useCallback, useEffect } from 'react'

import { useMessage } from './message.hook';

const storageName = 'userData'

export const useAuth = () => {
    const { showToast } = useMessage();
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

    const logout = useCallback((doToast = true) => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        if (doToast) showToast('Do zobaczenia, Partnerze!', 'success')
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}