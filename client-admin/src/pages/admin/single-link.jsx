import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Spinner } from '@blueprintjs/core';

import InputFields from '../../components/admin/input-fields.component';
import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

function SingleLink() {
    const { links, setLinks, anyChanges, setAnyChanges } = useContext(DataContext)

    const linkId = useParams().id
    const history = useHistory()

    const searchLink = links.find(link => link.id === linkId)
    const linkIndex = links.findIndex(link => link.id === linkId)

    useLayoutEffect(() => {
        if (searchLink === undefined) history.push('/profile')
    }, [])

    const changeHandler = event => {
        if (!anyChanges) setAnyChanges(true)
        setLinks(links.map(el => (el.id === linkId ? { ...el, [event.target.name]: event.target.value } : el)))
    }

    if (!searchLink) return <Spinner intent='none' size={70} />

    return (
        <DataChangingTemplate
            pageName={links[linkIndex].header}
            whatSave='single-link'
            link={links[linkIndex]}
        >
            <main className="about-page">
                <InputFields
                    name='header'
                    input
                    placeholder='Nazwa linku'
                    label='Nazwa linku'
                    onChange={changeHandler}
                    value={links[linkIndex].header}
                />
                <InputFields
                    name='subheader'
                    input
                    placeholder='Podtytuł'
                    label='Podtytuł'
                    onChange={changeHandler}
                    value={links[linkIndex].subheader}
                />
                <InputFields
                    name='href'
                    input
                    placeholder='URL'
                    label='URL'
                    onChange={changeHandler}
                    value={links[linkIndex].href}
                />

            </main>
        </DataChangingTemplate>
    )
}

export default SingleLink;