import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import DragDrop from '../../components/admin/drag-n-drop.component';

import DataChangingTemplate from '../../templates/data-changing-page.template';


function Products() {
    const { changeProducts } = useContext(DataContext)



    return (
        <DataChangingTemplate
            pageName='Twoje produkty'
            whatSave='products'
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '90%', paddingBottom: '100px' }}>
                <div>
                    <DragDrop type='products' />
                </div>
                <div className="add-icon">
                    <Tooltip title="Dodać produkt" interactive arrow>
                        <Fab color="primary" aria-label="add" onClick={() => changeProducts('add-new-product')} >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </DataChangingTemplate>
    )
}

export default Products;