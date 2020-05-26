import React, { useState, useContext, useEffect } from 'react';

import DataContext from '../context/card-data.context';

import { Alert, Intent } from '@blueprintjs/core';

import Header from '../components/admin/data-changing-header.component';


function DataChangingPage(props) {
    const { save, exit, changeProfile, loadingApi, request, error, clearError } = useContext(DataContext)

    const [anyChanges, setAnyChanges] = useState(false); // any data changes on inputs?
    const [isOpen, setIsOpen] = useState(false); // is Open the alert about exit without saving?

    const [form, setForm] = useState({}); // form inputs data

    const goHistoryBack = () => {
        if (anyChanges) {
            return setIsOpen(true); // alert openning about unsaved data
        }
        window.history.back()
    }

    const changeHandler = event => {
        // writing the form input changes 
        if (!anyChanges) setAnyChanges(true)
        changeProfile({ ...form, [event.target.name]: event.target.value });
    }

    // alert about exit without unsaving - handlers on button clicking
    const handleMoveConfirm = () => {
        setIsOpen(false)
        exit()
        window.history.back()
    };
    const handleMoveCancel = () => setIsOpen(false);

    return (
        <>
            <Header
                pageName={props.pageName}
                anyChanges={anyChanges}
                loading={loadingApi}
                goHistoryBack={goHistoryBack}
                saveChanges={save}
            />

            <Alert
                className=''
                cancelButtonText="Zostań na stronie"
                confirmButtonText="Opuść"
                icon="warning-sign"
                intent={Intent.DANGER}
                isOpen={isOpen}
                onCancel={handleMoveCancel}
                onConfirm={handleMoveConfirm}
            >
                <p>
                    Na pewno chcesz opuścić stronę? Wszystkie niezapisane dane zostaną <b>utracone</b>.
                </p>
            </Alert>

            {props.children(changeHandler)}
        </>
    );
}

export default DataChangingPage;