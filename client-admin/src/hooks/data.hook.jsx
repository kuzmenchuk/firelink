import { useState, useEffect } from 'react'

import { v1 as uuidv1 } from 'uuid';

import { useHttp } from './http.hook';
import { useMessage } from './message.hook';
import { generateBase64FromImage } from '../utils/image-preview';

const data = {
    linkname: '',
    analytics: {
        facebook: '',
        google: ''
    },
    design: {
        background: { color: 'linear-gradient(135deg, rgb(81, 179, 247) 0%, rgba(81, 179, 247, 0.6) 100%)', imageUrl: '', isColor: true },
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
    const newProductTemplate = {
        id: '',
        active: false,
        header: 'Nowy Produkt',
        subheader: '',
        href: '',
        imageUrl: ''
    }
    const [anyChanges, setAnyChanges] = useState(false); // any data changes on inputs?

    const { showToast } = useMessage();
    const { loading, request } = useHttp(); // request to server hook
    const loadingApi = loading;
    const [imagePreview, setImagePreview] = useState(null)

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
    const changeProfile = (key, value) => {
        if (!anyChanges) setAnyChanges(true)
        switch (key) {
            case 'form-data':
                setProfile({ ...profile, [value.target.name]: value.target.value });
                break;

            case 'add-image':
                generateBase64FromImage(value.target.files[0]).then(file => setImagePreview(file)).catch(e => setImagePreview(null));
                setProfile({ ...profile, photofile: value.target.files[0] });
                value.target.value = ''
                break;

            case 'delete-image':
                setProfile({ ...profile, photoUrl: 'http://localhost:5000/images/avatar_default.svg' });
                break;

            case 'reset-image':
                setImagePreview(null)
                setProfile({ ...profile, photoUrl: theDataObject.profileAbout.photoUrl, photofile: null });
                break;

            default:
                break;
        }
    }

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
                setImagePreview(null)
                setAnyChanges(false)
            }
        } catch (error) { }
    }





    const changeDesign = (key, value) => {
        if (!anyChanges) setAnyChanges(true)

        switch (key) {
            case 'color':
                setDesign({ ...design, background: { ...design.background, color: value } });
                break;

            case 'isColor':
                setDesign({ ...design, background: { ...design.background, isColor: value } });
                break;

            case 'add-image':
                generateBase64FromImage(value.target.files[0]).then(file => setImagePreview(file)).catch(e => setImagePreview(null));
                setDesign({ ...design, photofile: value.target.files[0] })
                value.target.value = ''
                break;

            case 'delete-image':
                setDesign({ ...design, background: { ...design.background, imageUrl: '' } })
                break;

            case 'reset-image':
                setImagePreview(null)
                setDesign({ ...design, background: { ...design.background, imageUrl: theDataObject.design.background.imageUrl }, photofile: null });
                break;

            case 'branding':
                setDesign({ ...design, branding: value })
                break;

            default:
                break;
        }
    }

    const saveDesign = async () => {
        try {
            const formData = new FormData();
            formData.append('color', design.background.color);
            formData.append('isColor', design.background.isColor);
            formData.append('imageUrl', design.background.imageUrl);
            formData.append('branding', design.branding);
            formData.append('photofile', design.photofile);

            const data = await request('/api/data-change/card/design', 'POST', formData, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                setTheDataObject({ ...theDataObject, design })
                window.history.back()
                showToast(data.message, 'success');
                setImagePreview(null)
                setAnyChanges(false)
            }
        } catch (error) { }
    }




    // <! -- LINKS -- >
    const addNewLink = async () => {
        try {
            newLinkTemplate.id = uuidv1()
            var newArr = links.concat(newLinkTemplate); // adding link object template
            setLinks(newArr);

            const data = await request('/api/data-change/card/links', 'POST', newArr,
                { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token })

            if (data) {
                setTheDataObject({ ...theDataObject, links: newArr })
                showToast('Nowy link jest dodany! Nie zapomnij go aktywować :)', 'success');
            }
        } catch (error) { }
    }

    const deleteLink = id => {
        if (!anyChanges) setAnyChanges(true)
        var newArr = links.filter(link => link.id !== id)
        setLinks(newArr)
    }

    const changeLinks = (key, id, value) => {
        if (!anyChanges) setAnyChanges(true)
        switch (key) {
            case 'add-new-link':
                addNewLink()
                setAnyChanges(false)
                break;

            case 'delete-link':
                deleteLink(id)
                break;

            case 'single-link-form-data':
                setLinks(links.map(el => (el.id === id ? { ...el, [value.target.name]: value.target.value } : el)))
                break;

            case 'single-link-active':
                setLinks(links.map(el => (el.id === id ? { ...el, active: !el.active } : el)))
                break;

            default:
                break;
        }
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
                setTheDataObject({ ...theDataObject, links })
                window.history.back()
                showToast(data.message, 'success');
                setAnyChanges(false)
            }
        } catch (error) { }
    }





    const changeMessengers = data => {
        setMessengers({ ...messengers, ...data });
    }







    // <! -- PRODUCTS -- >
    const addNewProduct = async () => {
        try {
            newProductTemplate.id = uuidv1()
            var newArr = products.concat(newProductTemplate);
            setProducts(newArr);

            const data = await request('/api/data-change/card/products', 'POST', newArr,
                { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token })

            if (data) {
                setTheDataObject({ ...theDataObject, products: newArr })
                showToast('Nowy produkt jest dodany! Nie zapomnij go aktywować :)', 'success');
            }
        } catch (error) { }
    }

    const deleteProduct = id => {
        if (!anyChanges) setAnyChanges(true)
        var newArr = products.filter(product => product.id !== id)
        setProducts(newArr)
    }

    const changeProducts = (key, id, value) => {
        if (!anyChanges) setAnyChanges(true)
        switch (key) {
            case 'add-new-product':
                addNewProduct()
                break;

            case 'delete-product':
                deleteProduct(id)
                break;

            case 'single-product-form-data':
                setProducts(products.map(el => (el.id === id ? { ...el, [value.target.name]: value.target.value } : el)))
                break;

            case 'single-product-add-image':
                generateBase64FromImage(value.target.files[0]).then(file => setImagePreview(file)).catch(e => setImagePreview(null));
                setProducts(products.map(el => (el.id === id ? { ...el, photofile: value.target.files[0] } : el)))
                value.target.value = ''
                break;

            case 'single-product-delete-image':
                setProducts(products.map(el => (el.id === id ? { ...el, imageUrl: '' } : el)))
                break;

            case 'single-product-reset-image':
                setImagePreview(null)
                const index = products.findIndex(el => el.id === id)
                setProducts(products.map(el => (el.id === id ? { ...el, imageUrl: theDataObject.products[index].imageUrl, photofile: null } : el)))
                break;

            case 'single-product-active':
                setProducts(products.map(el => (el.id === id ? { ...el, active: !el.active } : el)))
                break;

            default:
                break;
        }
    }

    const saveProducts = async () => {
        try {
            const data = await request('/api/data-change/card/products', 'POST', products, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                setTheDataObject({ ...theDataObject, products })
                //window.history.back()
                showToast(data.message, 'success');
                setAnyChanges(false)
            }
        } catch (error) { }
    }

    const saveSingleProduct = async (product) => {
        try {
            const formData = new FormData();
            formData.append('id', product.id);
            formData.append('active', product.active);
            formData.append('header', product.header);
            formData.append('subheader', product.subheader);
            formData.append('href', product.href);
            formData.append('imageUrl', product.imageUrl);
            formData.append('photofile', product.photofile);

            const data = await request('/api/data-change/card/single-product', 'POST', formData, { Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userData')).token });

            if (data) {
                setTheDataObject({ ...theDataObject, products })
                window.history.back()
                showToast(data.message, 'success');
                setImagePreview(null)
                setAnyChanges(false)
            }
        } catch (error) { }
    }



    // Exit Function
    function exit() {
        setDesign(theDataObject.design)
        setLinks(theDataObject.links)
        setMessengers(theDataObject.messengers)
        setProducts(theDataObject.products)
        setProfile(theDataObject.profileAbout)
    }

    return {
        saveProfile, changeProfile, profile,
        saveLinks, saveSingleLink, changeLinks, setLinks, links, addNewLink, deleteLink,
        saveDesign, changeDesign, design,
        saveProducts, saveSingleProduct, changeProducts, addNewProduct, deleteProduct, products, setProducts,

        setTheDataObject, theDataObject,
        changeMessengers,
        anyChanges, setAnyChanges,
        loadingApi,
        imagePreview,
        exit
    }
}