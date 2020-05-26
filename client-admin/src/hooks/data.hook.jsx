import { useState, useCallback, useEffect } from 'react'

import { Intent } from '@blueprintjs/core';
import { AppToaster } from '../components/Toaster';

import { useHttp } from './http.hook';




function showToast(msg, error = true) {
    if (error) {
        return AppToaster.show({ message: msg, intent: Intent.WARNING, icon: "warning-sign" });
    }
    AppToaster.show({ message: msg, intent: Intent.SUCCESS, icon: "tick" });
}

const data = {
    linkname: '',
    analytics: {
        facebook: '',
        google: ''
    },
    design: {
        background: { color: 'linear-gradient(135deg, rgb(81, 179, 247) 0%, rgba(81, 179, 247, 0.6) 100%)', image: null },
        branding: true
    },
    links: [],
    messengers: [],
    products: [],
    profileAbout: {
        description: ' ',
        fullname: ' ',
        photoUrl: 'https://mssg.me/static/avatars/avatar_default.svg'
    }
}


export const useData = () => {

    const { loading, request, error, clearError } = useHttp(); // request to server hook
    const loadingApi = loading;
    // The Main State
    const [theDataObject, setTheDataObject] = useState(data)

    // Card States
    const [linkName, setLinkName] = useState(theDataObject.linkname)
    const [design, setDesign] = useState(theDataObject.design)
    const [links, setLinks] = useState(theDataObject.links)
    const [messengers, setMessengers] = useState(theDataObject.messengers)
    const [products, setProducts] = useState(theDataObject.products)
    const [profile, setProfile] = useState(theDataObject.profileAbout)

    useEffect(() => {
        setLinkName(theDataObject.linkname)
        setDesign(theDataObject.design)
        setProfile(theDataObject.profileAbout)
        setLinks(theDataObject.links)
        setMessengers(theDataObject.messengers)
        setProducts(theDataObject.products)
    }, [theDataObject])

    // Data Transformation Functions
    const changeProfile = data => {
        setProfile({ ...profile, ...data });

    }

    const changeDesign = data => {
        setDesign(data);
    }

    const changeMessengers = data => {
        setMessengers(data);
    }

    const changeLinks = data => {
        setLinks(data);
    }

    const changeProducts = data => {
        setProducts(data);
    }


    // Save and exit functions
    function exit() {
        setDesign(theDataObject.design)
        setLinks(theDataObject.links)
        setMessengers(theDataObject.messengers)
        setProducts(theDataObject.products)
        setProfile(theDataObject.profileAbout)
    }

    const save = async () => {


        try {
            const data = await request('/api/data-change/card/profile', 'POST', { ...profile }, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });
            window.history.back()
            showToast(data.message, false);
        } catch (error) {
            showToast(error.message)
            clearError()
        }
    }

    // console.log(theDataObject)


    return {
        save, loadingApi, request, error, clearError, // API 
        exit,
        setTheDataObject,
        theDataObject,
        changeProfile, profile,
        changeDesign, changeLinks, changeMessengers, changeProducts
    }
}