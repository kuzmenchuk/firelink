import React, { useContext, useLayoutEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


import UploadFiles from '../../components/admin/upload-files.component';
import InputFields from '../../components/admin/input-fields.component';
import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import './single-product.styles.scss';

function SingleProduct() {
    const { products, changeProducts, imagePreview } = useContext(DataContext)
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
                    label={products[productIndex].active ? 'Aktywny' : 'Nieaktywny'}
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
                    maxLength='48'
                />
                <InputFields
                    name='subheader'
                    input
                    placeholder='Podtytuł'
                    label='Podtytuł'
                    onChange={(event) => changeProducts('single-product-form-data', ProductId, event)}
                    value={products[productIndex].subheader}
                    maxLength='48'
                />
                <InputFields
                    name='href'
                    input
                    placeholder='URL'
                    label='URL'
                    onChange={(event) => changeProducts('single-product-form-data', ProductId, event)}
                    value={products[productIndex].href}
                />

                <h4>Zdjęcie produktu</h4>
                {
                    products[productIndex].imageUrl ? (
                        <div className="product-image__section">
                            <div className="product-image__outter">
                                <div className="product-image__inner">
                                    <img src={imagePreview ? imagePreview : products[productIndex].imageUrl} alt={products[productIndex].header} />
                                </div>
                            </div>
                        </div>
                    ) :
                        <div><p>Brak zdjęcia, dodaj klikając przycisk poniżej</p></div>
                }
                <div style={{ display: 'flex', width: '100%' }}>
                    <UploadFiles onChange={(event) => changeProducts('single-product-add-image', ProductId, event)} />
                    {
                        products[productIndex].imageUrl ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={(event) => changeProducts('single-product-delete-image', ProductId, event)}
                            >
                                Usuń
                            </Button>

                        ) : null
                    }
                </div>


            </main>
        </DataChangingTemplate>
    )
}

export default SingleProduct;