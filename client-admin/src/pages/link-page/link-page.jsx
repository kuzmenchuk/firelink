import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import App from '../../app-preview/app';
import { useHttp } from '../../hooks/http.hook';

import LinearProgress from '@material-ui/core/LinearProgress';

const data = {
    profileAbout: {
        description: '',
        fullname: '',
        photoUrl: `http://localhost:5000/images/avatar_default.svg`
    },
    design: {
        background: {
            color: '#8ED1FC',
            isColor: true,
            imageUrl: ''
        },
        branding: true
    },
    products: [],
    links: [],
    messengers: []
}

export default function Linkpage() {
    const [card, setCard] = useState(data)
    const { loading, request } = useHttp()
    const history = useHistory();
    const linkId = useParams().id

    useEffect(() => {
        async function fetchData() {
            try {
                const fetched = await request(`/api/${linkId}`, 'GET')
                console.log(fetched)
                if (fetched) {
                    setCard(fetched)
                } else {
                    console.log('wtf')
                    history.push('/')
                }
            } catch (e) { }
        }
        fetchData()
    }, [request])

    if (loading) return <div style={{ width: '100vw' }}><LinearProgress /></div>

    return (
        <App
            theDataObject={card}
            profileData={card.profileAbout}
            links={card.links.filter(el => el.active)}
            design={card.design}
            products={card.products.filter(el => el.active)}
        />
    )

}