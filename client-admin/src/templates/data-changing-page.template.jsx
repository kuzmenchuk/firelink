import React, { useState, useContext, useEffect } from 'react';

import DataContext from '../context/card-data.context';

import { Alert, Intent } from '@blueprintjs/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Header from '../components/admin/data-changing-header.component';


function DataChangingPage(props) {
    const { anyChanges, setAnyChanges, exit, loadingApi } = useContext(DataContext)

    const [isOpen, setIsOpen] = useState(false); // is Open the alert about exit without saving?

    const goHistoryBack = () => {
        if (anyChanges) {
            return setIsOpen(true); // alert openning about unsaved data
        }
        window.history.back()
    }
    // alert about exit without unsaving - handlers on button clicking
    const handleMoveConfirm = () => {
        setIsOpen(false)
        setAnyChanges(false)
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
                whatSave={props.whatSave}
                link={props.link}
            />

            <Dialog
                open={isOpen}
                onClose={handleMoveCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="alert-popup"
            >
                <DialogTitle id="alert-dialog-title">Na pewno chcesz opuścić stronę?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Wszystkie niezapisane dane zostaną <b>utracone</b>.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleMoveCancel} variant="contained" autoFocus>
                        Zostań na stronie
                    </Button>
                    <Button onClick={handleMoveConfirm} variant="contained" color="primary">
                        Opuść
                    </Button>
                </DialogActions>
            </Dialog>

            {/* <Alert
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
            </Alert> */}

            {props.children}
        </>
    );
}

export default DataChangingPage;