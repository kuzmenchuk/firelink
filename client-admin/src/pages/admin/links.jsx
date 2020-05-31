import React, { useContext } from 'react';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import DragDrop from '../../components/admin/drag-n-drop.component';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import './links.styles.scss';


function Links() {
    const { links, setLinks, setAnyChanges, changeLinks } = useContext(DataContext)


    return (
        <DataChangingTemplate
            pageName='Twoje linki'
            whatSave='links'
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '90%', paddingBottom: '100px' }}>
                <div>
                    <DragDrop type='links' />
                </div>
                <div className="add-icon">
                    <Tooltip title="Dodać link" interactive arrow>
                        <Fab color="primary" aria-label="add" onClick={() => changeLinks('add-new-link')} >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </div>
            </div>

        </DataChangingTemplate>
    )
}

export default Links;