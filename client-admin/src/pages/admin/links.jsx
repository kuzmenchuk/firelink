import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import './links.styles.scss';

// Drag'n'Drop starts
const DragHandle = sortableHandle(() => <span className="drag-handler">::</span>);
const SortableContainer = sortableContainer(({ children }) => {
    return <div className="dnd-list__box">{children}</div>;
});

const IOSSwitch = withStyles((theme) => ({
    root: {
        width: 32,
        height: 20,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 18,
        height: 18,
    },
    track: {
        borderRadius: 20 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}))(({ classes, ...props }) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});


function Links() {
    const { links, setLinks, setAnyChanges, changeLinks } = useContext(DataContext)

    const SortableItem = sortableElement(({ header, href, subheader, active }) => (
        <div className="dnd-list__item">
            <div className="dnd-list__item_main">
                <div><DragHandle /></div>
                <div>
                    <Link to={`/profile/links/${href}`}>{header}</Link>
                    <span>{subheader}</span>
                </div>
            </div>
            <div className="dnd-list__item_secondary">

                <FormControlLabel
                    control={
                        <IOSSwitch checked={active} onChange={() => changeLinks('single-link-active', href)} name="checkedB" />
                    }
                />
                <Tooltip title="Usunąć link" interactive arrow>
                    <IconButton aria-label="delete" onClick={() => changeLinks('delete-link', href)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    ));
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setAnyChanges(true)
        setLinks(arrayMove(links, oldIndex, newIndex))
    };
    // Drag'n'Drop ends + useContext


    return (
        <DataChangingTemplate
            pageName='Twoje linki'
            whatSave='links'
        >
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
                <div>
                    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                        {links.filter(link => link.active).map((value, index) => (
                            <SortableItem key={value.id} index={index} active={value.active} header={value.header} subheader={value.subheader} href={value.id} />
                        ))}
                    </SortableContainer>
                    <br />
                    <br />
                    <h3>Nieaktywne linki</h3>
                    <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                        {links.filter(link => !link.active).map((value, index) => (
                            <SortableItem key={value.id} index={index} active={value.active} header={value.header} subheader={value.subheader} href={value.id} />
                        ))}
                    </SortableContainer>
                </div>
                <div>
                    {/* <button type="button" name="add-new-link" onClick={() => changeLinks('add-new-link')}>Dodaj nowy link</button> */}
                    <Fab color="primary" aria-label="add" onClick={() => changeLinks('add-new-link')} >
                        <AddIcon />
                    </Fab>
                </div>
            </div>

        </DataChangingTemplate>
    )
}

export default Links;