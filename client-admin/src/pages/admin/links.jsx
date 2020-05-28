import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import './links.styles.scss';

// Drag'n'Drop starts
const DragHandle = sortableHandle(() => <span className="drag-handler">::</span>);
const SortableContainer = sortableContainer(({ children }) => {
    return <div className="Showcase__style__list Showcase__style__stylizedList">{children}</div>;
});


function Links() {
    const { links, setLinks, setAnyChanges, deleteLink, addNewLink } = useContext(DataContext)

    const SortableItem = sortableElement(({ value, href }) => (
        <div className="Showcase__style__item Showcase__style__stylizedItem">
            <DragHandle />
            <Link to={`/profile/links/${href}`}>{value}</Link>
            <button onClick={() => deleteLink(href)}>delete</button>
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
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {links.map((value, index) => (
                    <SortableItem key={value.id} index={index} value={value.header} href={value.id} />
                ))}
            </SortableContainer>
            <button type="button" name="add-new-link" onClick={addNewLink}>Dodaj nowy link</button>
        </DataChangingTemplate>
    )
}

export default Links;