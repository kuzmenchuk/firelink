import React, { useContext, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Spinner, Switch } from '@blueprintjs/core';

import InputFields from '../../components/admin/input-fields.component';
import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

function SingleLink() {
    const { links, changeLinks } = useContext(DataContext)

    const linkId = useParams().id
    const history = useHistory()

    const searchLink = links.find(link => link.id === linkId)
    const linkIndex = links.findIndex(link => link.id === linkId)

    useLayoutEffect(() => {
        if (searchLink === undefined) history.push('/profile')
    }, [])

    if (!searchLink) return <Spinner intent='none' size={70} />

    return (
        <DataChangingTemplate
            pageName={links[linkIndex].header}
            whatSave='single-link'
            link={links[linkIndex]}
        >
            <main className="about-page">
                <Switch checked={links[linkIndex].active} label={'Widoczność linku'} onChange={() => changeLinks('single-link-active', linkId)} />
                <InputFields
                    name='header'
                    input
                    placeholder='Nazwa linku'
                    label='Nazwa linku'
                    onChange={(event) => changeLinks('single-link-form-data', linkId, event)}
                    value={links[linkIndex].header}
                />
                <InputFields
                    name='subheader'
                    input
                    placeholder='Podtytuł'
                    label='Podtytuł'
                    onChange={(event) => changeLinks('single-link-form-data', linkId, event)}
                    value={links[linkIndex].subheader}
                />
                <InputFields
                    name='href'
                    input
                    placeholder='URL'
                    label='URL'
                    onChange={(event) => changeLinks('single-link-form-data', linkId, event)}
                    value={links[linkIndex].href}
                />

            </main>
        </DataChangingTemplate>
    )
}

export default SingleLink;