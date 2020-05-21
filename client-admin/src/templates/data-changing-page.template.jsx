import React, { useState, useContext, useEffect } from 'react';

import { useHttp } from '../hooks/http.hook';

import DataContext from '../context/card-data.context';

import { Alert, Intent } from '@blueprintjs/core';

import { AppToaster } from '../components/Toaster';
import Header from '../components/admin/data-changing-header.component';


function showToast(msg, error = true) {
    if (error) {
        return AppToaster.show({ message: msg, intent: Intent.WARNING, icon: "warning-sign" });
    }
    AppToaster.show({ message: msg, intent: Intent.SUCCESS, icon: "tick" });
}


function DataChangingPage(props) {
    const { save, exit, changeProfile, loading, request, error, clearError } = useContext(DataContext)

    const [anyChanges, setAnyChanges] = useState(false); // any data changes on inputs?
    const [isOpen, setIsOpen] = useState(false); // is Open the alert about exit without saving?

    const [form, setForm] = useState({}); // form inputs data

    const goHistoryBack = () => {
        if (anyChanges) {
            return setIsOpen(true); // alert openning about unsaved data
        }

        window.history.back()
    }

    // saving changes, sending request to server
    const saveChanges = () => {
        save()

    }

    useEffect(() => {
        if (error) {
            showToast(error)
            clearError()
        }
    }, [error])

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
                loading={loading}
                goHistoryBack={goHistoryBack}
                saveChanges={saveChanges}
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