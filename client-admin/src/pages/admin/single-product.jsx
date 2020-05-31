import React, { useContext, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import UploadFiles from '../../components/admin/upload-files';
import InputFields from '../../components/admin/input-fields.component';
import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

function SingleProduct() {
    const { products, changeProducts } = useContext(DataContext)
    const ProductId = useParams().id
    const history = useHistory()

    const searchLink = products.find(link => link.id === ProductId)
    const productIndex = products.findIndex(link => link.id === ProductId)

    useLayoutEffect(() => {
        if (searchLink === undefined) history.push('/profile')
    }, [])

    if (!searchLink) return <CircularProgress />

    return (
        <DataChangingTemplate
            pageName={products[productIndex].header}
            whatSave='single-product'
            link={products[productIndex]}
        >
            <main className="about-page">
                <FormControlLabel
                    control={
                        <Switch
                            checked={products[productIndex].active}
                            onChange={() => changeProducts('single-product-active', ProductId)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label='Widoczność produktu'
                />
                <br />
                <br />
                <InputFields
                    name='header'
                    input
                    placeholder='Nazwa linku'
                    label='Nazwa linku'
                    onChange={(event) => changeProducts('single-product-form-data', ProductId, event)}
                    value={products[productIndex].header}
                />
                <InputFields
                    name='subheader'
                    input
                    placeholder='Podtytuł'
                    label='Podtytuł'
                    onChange={(event) => changeProducts('single-product-form-data', ProductId, event)}
                    value={products[productIndex].subheader}
                />
                <InputFields
                    name='href'
                    input
                    placeholder='URL'
                    label='URL'
                    onChange={(event) => changeProducts('single-product-form-data', ProductId, event)}
                    value={products[productIndex].href}
                />
                <br />
                <UploadFiles
                    onChange={(event) => changeProducts('single-product-add-image', ProductId, event)}
                    img={products[productIndex].photofile}
                />


            </main>
        </DataChangingTemplate>
    )
}

export default SingleProduct;