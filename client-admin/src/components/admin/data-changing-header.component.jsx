import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Button } from "@blueprintjs/core";

import './data-changing-header.styles.scss';


export default function MenuItem(props) {
    const { saveProfile, saveLinks } = useContext(DataContext)

    const saveChanges = key => {
        switch (key) {
            case 'links':
                saveLinks()
                break;

            case 'profile':
                saveProfile()
                break;

            default:
                break;
        }
    }

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
                        className="bp3-button"
                        loading={props.loading}
                        onClick={() => saveChanges(props.whatSave)}
                    >Zapisz</Button>
                    : null
            }
            </div>
        </div>
    )
}

