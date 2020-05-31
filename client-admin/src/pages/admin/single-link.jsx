import React, { useContext, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

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

    if (!searchLink) return <CircularProgress />

    return (
        <DataChangingTemplate
            pageName={links[linkIndex].header}
            whatSave='single-link'
            link={links[linkIndex]}
        >
            <main className="about-page">
                <FormControlLabel
                    control={
                        <Switch
                            checked={links[linkIndex].active}
                            onChange={() => changeLinks('single-link-active', linkId)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label='Widoczność linku'
                />
                <br />
                <br />
                <InputFields
                    name='header'
                    input
                    placeholder='Nazwa linku'
                    label='Nazwa linku'
                    onChange={(event) => changeLinks('single-link-form-data', linkId, event)}
                    value={links[linkIndex].header}
                    maxLength='48'
                />
                <InputFields
                    name='subheader'
                    input
                    placeholder='Podtytuł'
                    label='Podtytuł'
                    onChange={(event) => changeLinks('single-link-form-data', linkId, event)}
                    value={links[linkIndex].subheader}
                    maxLength='48'
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