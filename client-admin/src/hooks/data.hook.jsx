import { useState } from 'react'

import { useHttp } from './http.hook';

const data = {
    linkname: '',
    data: {
        analytics: {
            facebook: '',
            google: ''
        },
        design: {
            background: { color: 'linear-gradient(135deg, rgb(81, 179, 247) 0%, rgba(81, 179, 247, 0.6) 100%)', image: null },
            branding: true
        },
        links: [
            { id: 1, header: 'Poznajmy się lepiej', subheader: 'kuzmenczuk.dev', href: 'https://kuzmenczuk.dev' },
            { id: 2, header: 'Zobacz mój profil na Instagramie', subheader: 'instagram.com', href: 'https://www.instagram.com/dima.kuzmenczuk/' },
            { id: 3, header: 'albo na Facebooku', subheader: 'facebook.com', href: 'https://www.facebook.com/kuzmenczuk.dev/' }
        ],
        messengers: [
            {
                id: 1,
                messenger: 'WhatsApp',
                href: '48730026274'
            },
            {
                id: 2,
                messenger: 'Messenger',
                href: 'kuzmenczuk.dev'
            },
            {
                id: 3,
                messenger: 'Telegram',
                href: 'kuzmenczuk'
            }
        ],
        products: [
            {
                id: 1,
                imgUrl: 'https://kuzmenczuk.dev/hi/static/png/product1.png',
                header: 'Stworzenie strony WWW',
                subheader: 'od 690zł',
                href: 'https://kuzmenczuk.dev/formularz'
            },
            {
                id: 2,
                imgUrl: 'https://kuzmenczuk.dev/hi/static/png/product2.png',
                header: 'Piękna e-wizytówka',
                subheader: 'W przedsprzedaży',
                href: 'https://kuzmenczuk.dev/e-link-formularz'
            },
            {
                id: 3,
                imgUrl: 'https://kuzmenczuk.dev/hi/static/png/product3.png',
                header: 'Kodowanie projektu',
                subheader: 'Wycena indywidualna',
                href: 'https://kuzmenczuk.dev/formularz/#/gotowy-projekt'
            },
            {
                id: 4,
                imgUrl: 'https://kuzmenczuk.dev/hi/static/png/product4.png',
                header: 'E-sklep',
                subheader: 'od 1390zł',
                href: 'https://kuzmenczuk.dev/formularz/#/e-sklep'
            }
        ],
        profileAbout: {
            description: 'Tworzę skuteczne strony WWW, e-sklepy oraz e-wizytówki, jak ta. Masz pytania? Napisz prosto do mnie:',
            fullname: 'Dima Kuzmenczuk',
            photoUrl: 'https://instagram.fwaw5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/92836199_256085652456090_3686233618268553216_n.jpg?_nc_ht=instagram.fwaw5-1.fna.fbcdn.net&_nc_ohc=FcpdLZ-umH0AX-62Pjk&oh=ebe4532f31b665e09348151bac0434bd&oe=5ECFCEBF'
        }
    }
}

export const useData = () => {
    const { loading, request, error, clearError } = useHttp(); // request to server hook
    // The Main State
    const [theDataObject, setTheDataObject] = useState(data)

    // Card States
    const [linkName, setLinkName] = useState(data.linkname)
    // card data
    const [design, setDesign] = useState(data.data.design)
    const [links, setLinks] = useState(data.data.links)
    const [messengers, setMessengers] = useState(data.data.messengers)
    const [products, setProducts] = useState(data.data.products)
    const [profile, setProfile] = useState(data.data.profileAbout)

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
        setDesign(data.data.design)
        setLinks(data.data.links)
        setMessengers(data.data.messengers)
        setProducts(data.data.products)
        setProfile(data.data.profileAbout)
    }

    const save = async () => {
        const wholeObject = {
            linkname: linkName,
            data: {
                analytics: {
                    facebook: null,
                    google: null
                },
                design: design,
                links: links,
                messengers: messengers,
                products: products,
                profileAbout: profile
            }
        }
        setTheDataObject(wholeObject);


        try {
            await request('/api/data-changes/card', 'POST', { ...wholeObject });

        } catch (error) { }

    }



    return {
        save, loading, request, error, clearError, // API 
        exit,
        theDataObject,
        changeProfile, profile,
        changeDesign, changeLinks, changeMessengers, changeProducts
    }
}