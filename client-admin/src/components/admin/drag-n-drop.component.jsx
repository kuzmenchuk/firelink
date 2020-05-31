import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import DataContext from '../../context/card-data.context';



const DragHandle = sortableHandle(() => <span className="drag-handler">::</span>);
const SortableContainer = sortableContainer(({ children }) => {
    return <div className="dnd-list__box">{children}</div>;
});

function DragDrop({ type }) {
    const { links, setLinks, setAnyChanges, changeLinks, products, setProducts, changeProducts } = useContext(DataContext)

    const deleteClick = (id) => {
        if (type === 'links') {
            changeLinks('delete-link', id)
        } else if (type === 'products') {
            changeProducts('delete-product', id)
        }
    }

    const SortableItem = sortableElement(({ header, id, subheader, active }) => (
        <div className={`dnd-list__item ${!active ? 'inactive' : null}`}>
            <div className="dnd-list__item_main">
                <div><DragHandle /></div>
                <div><span className="active-badge" /></div>
                <Link to={`/profile/${type === 'links' ? 'links' : 'products'}/${id}`}>
                    <div>
                        <span className="dnd-list__item_header">{header}</span>
                        <span className="dnd-list__item_subheader">{subheader}</span>
                    </div>
                </Link>
            </div>
            <div className="dnd-list__item_secondary">
                <Tooltip title="Usunąć" interactive arrow>
                    <IconButton aria-label="delete" onClick={() => deleteClick(id)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div >
    ));
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setAnyChanges(true)
        if (type === 'links') {
            setLinks(arrayMove(links, oldIndex, newIndex))
        } else if (type === 'products') {
            setProducts(arrayMove(products, oldIndex, newIndex))
        }
    };


    // RETURN 
    if (type === 'links') {
        return (
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {links.map((value, index) => (
                    <SortableItem key={value.id} index={index} active={value.active} header={value.header} subheader={value.subheader} id={value.id} />
                ))}
            </SortableContainer>
        )
    } else if (type === 'products') {
        return (
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {products.map((value, index) => (
                    <SortableItem key={value.id} index={index} active={value.active} header={value.header} subheader={value.subheader} id={value.id} />
                ))}
            </SortableContainer>
        )
    }

}

export default DragDrop