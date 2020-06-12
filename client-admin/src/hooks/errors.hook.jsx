import { useCallback, useContext } from 'react'

import { AuthContext } from '../context/auth-context'

import { useMessage } from './message.hook';

export const useError = () => {
    const { logout } = useContext(AuthContext)
    const { showToast } = useMessage();

    const errorHandling = useCallback(errMsg => {
        if (errMsg === 'jwt expired') {
            showToast('Twój token już jest nieważny, zaloguj się ponownie', 'error')
            return logout(false);
        }
        showToast(errMsg, 'error');
    }, [])


    return { errorHandling }
}