import React, { useContext, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { Spinner, Switch } from '@blueprintjs/core';

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

    if (!searchLink) return <Spinner intent='none' size={70} />

    return (
        <DataChangingTemplate
            pageName={products[productIndex].header}
            whatSave='single-product'
            link={products[productIndex]}
        >
            <main className="about-page">
                <Switch checked={products[productIndex].active} label={'Widoczność produktu'} onChange={() => changeProducts('single-product-active')} />
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
                <br />
                <div className="form-group files color">
                    <label>Wybierz zdjęcie</label>
                    <input type="file" name="photofile" onChange={(event) => changeProducts('single-product-form-image', ProductId, event)} className="form-control" multiple="" />
                </div>

            </main>
        </DataChangingTemplate>
    )
}

export default SingleProduct;