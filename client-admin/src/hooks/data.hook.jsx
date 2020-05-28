import { useState, useCallback, useEffect } from 'react'

import { v1 as uuidv1 } from 'uuid';

import { useHttp } from './http.hook';
import { useMessage } from './message.hook';

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
    const newLinkTemplate = {
        id: '',
        active: false,
        header: 'Nowy Link',
        subheader: '',
        href: ''
    }
    const [anyChanges, setAnyChanges] = useState(false); // any data changes on inputs?

    const { showToast } = useMessage();
    const { loading, request } = useHttp(); // request to server hook
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
    const changeProfile = event => {
        // setProfile({ ...profile, ...data });
        if (!anyChanges) setAnyChanges(true)
        if (event.target.files) {
            setProfile({ ...profile, photofile: event.target.files[0] });
        } else {
            setProfile({ ...profile, [event.target.name]: event.target.value });
        }

    }

    const changeDesign = data => {
        setDesign({ ...design, ...data });
    }

    const changeMessengers = data => {
        setMessengers({ ...messengers, ...data });
    }


    // <! -- LINKS -- >
    const changeLinks = data => {
        if (!anyChanges) setAnyChanges(true)
        setLinks(data)

    }

    const addNewLink = async () => {
        try {
            newLinkTemplate.id = uuidv1()
            var newArr = links.concat(newLinkTemplate);
            setLinks(newArr);

            const data = await request('/api/data-change/card/links', 'POST', newArr,
                { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token })

            if (data) {
                setTheDataObject({ ...theDataObject, links: newArr })
                showToast('Nowy link jest dodany!', 'success');
            }
        } catch (error) { }
    }

    const deleteLink = id => {
        if (!anyChanges) setAnyChanges(true)
        var newArr = links.filter(link => link.id !== id)
        setLinks(newArr)
    }


    // <! -- PRODUCTS -- >
    const changeProducts = data => {
        setProducts({ ...products, ...data });
    }


    // Exit Function
    function exit() {
        setDesign(theDataObject.design)
        setLinks(theDataObject.links)
        setMessengers(theDataObject.messengers)
        setProducts(theDataObject.products)
        setProfile(theDataObject.profileAbout)
    }


    // Save FunctionS
    const saveProfile = async () => {
        try {
            const formData = new FormData();
            formData.append('description', profile.description);
            formData.append('fullname', profile.fullname);
            formData.append('photoUrl', profile.photoUrl);
            formData.append('photofile', profile.photofile);

            const data = await request('/api/data-change/card/profile', 'POST', formData, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                setTheDataObject({ ...theDataObject, profileAbout: { ...profile } })
                window.history.back()
                showToast(data.message, 'success');
                setAnyChanges(false)
            }
        } catch (error) { }
    }

    const saveLinks = async () => {
        try {
            const data = await request('/api/data-change/card/links', 'POST', links, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                setTheDataObject({ ...theDataObject, links })
                //window.history.back()
                showToast(data.message, 'success');
                setAnyChanges(false)
            }
        } catch (error) { }
    }

    const saveSingleLink = async (link) => {
        try {
            const data = await request('/api/data-change/card/single-link', 'POST', link, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                console.log(links)
                setTheDataObject({ ...theDataObject, links })
                window.history.back()
                showToast(data.message, 'success');
                setAnyChanges(false)
            }
        } catch (error) { }
    }

    return {
        saveProfile, changeProfile, profile,
        saveLinks, saveSingleLink, changeLinks, setLinks, links, addNewLink, deleteLink,

        setTheDataObject, theDataObject,
        changeDesign, changeMessengers, changeProducts,
        anyChanges, setAnyChanges,
        loadingApi,
        exit
    }
}