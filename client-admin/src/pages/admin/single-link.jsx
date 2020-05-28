import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import InputFields from '../../components/admin/input-fields.component';
import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

function SingleLink() {
    const { links, setLinks, setAnyChanges } = useContext(DataContext)
    const linkId = useParams().id
    const history = useHistory()

    const searchLink = links.find(link => link.id === linkId)
    console.log(searchLink)

    if (searchLink === undefined) history.push('/')

    return (
        <DataChangingTemplate
            pageName={searchLink ? searchLink.header : null}
        >
            {
                changeHandler => (
                    <main className="about-page">
                        <h1>Jeee!</h1>
                        <InputFields
                            name='fullname'
                            input
                            placeholder='Twoje Imię'
                            label='Nazwa linku'
                            value={searchLink.header}
                        />
                        <InputFields
                            name='description'
                            input
                            placeholder='Opis'
                            label='Subheader'
                            value={searchLink.subheader}
                        />
                        <InputFields
                            name='href'
                            input
                            placeholder='Opis'
                            label='Link dokąd'
                            value={searchLink.href}
                        />

                    </main>
                )
            }
        </DataChangingTemplate>
    )
}

export default SingleLink;