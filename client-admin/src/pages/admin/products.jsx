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


function Products() {
    const { products, setProducts, setAnyChanges, changeProducts } = useContext(DataContext)

    const SortableItem = sortableElement(({ value, href }) => (
        <div className="Showcase__style__item Showcase__style__stylizedItem">
            <DragHandle />
            <Link to={`/profile/products/${href}`}>{value}</Link>
            <button onClick={() => changeProducts('delete-product', href)}>delete</button>
        </div>
    ));
    const onSortEnd = ({ oldIndex, newIndex }) => {
        setAnyChanges(true)
        setProducts(arrayMove(products, oldIndex, newIndex))
    };
    // Drag'n'Drop ends + useContext
    console.log(products)


    return (
        <DataChangingTemplate
            pageName='Twoje produkty'
            whatSave='products'
        >
            <SortableContainer onSortEnd={onSortEnd} useDragHandle>
                {products.map((value, index) => (
                    <SortableItem key={value.id} index={index} value={value.header} href={value.id} />
                ))}
            </SortableContainer>
            <button type="button" name="add-new-product" onClick={() => changeProducts('add-new-product')}>Dodaj nowy produkt</button>
        </DataChangingTemplate>
    )
}

export default Products;