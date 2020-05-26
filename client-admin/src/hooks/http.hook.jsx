import { useState, useCallback } from 'react'

import { useError } from './errors.hook';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)

    const { errorHandling } = useError();

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                if (data.errors) {
                    throw new Error(data.errors[0].msg)
                } else if (data.message) {
                    throw new Error(data.message)
                }
                throw new Error('Ups...coś poszło nie tak. Spróbuj jeszcze raz')
            }
            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            errorHandling(e.message)
            // throw e
        }
    }, [errorHandling])

    return { loading, request }
}