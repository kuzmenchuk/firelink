import React from 'react';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Button } from "@blueprintjs/core";

import './data-changing-header.styles.scss';


export default function MenuItem(props) {

    return (
        <div className="settings-header">
            <div className="go-back">
                <button
                    onClick={props.goHistoryBack}
                ><MdKeyboardArrowLeft /></button>
            </div>
            <div><h2>{props.pageName}</h2></div>
            <div>{
                props.anyChanges
                    ? <Button
                        type="button"
                        class="bp3-button"
                        loading={props.loading}
                        onClick={props.saveChanges}
                    >Zapisz</Button>
                    : null
            }
            </div>
        </div>
    )
}

