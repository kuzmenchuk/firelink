import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import { MdKeyboardArrowLeft } from 'react-icons/md';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import './data-changing-header.styles.scss';

const useStyles = makeStyles((theme) => ({
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    }
}));


export default function MenuItem(props) {
    const { saveProfile, saveLinks, saveSingleLink, saveDesign, saveProducts, saveSingleProduct } = useContext(DataContext)
    const classes = useStyles();

    const saveChanges = key => {
        switch (key) {
            case 'links':
                saveLinks()
                break;

            case 'single-link':
                saveSingleLink(props.link)
                break;

            case 'profile':
                saveProfile()
                break;

            case 'design':
                saveDesign()
                break;

            case 'products':
                saveProducts()
                break;

            case 'single-product':
                saveSingleProduct(props.link)
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
                props.anyChanges ?
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />}
                            loading={props.loading}
                            onClick={() => saveChanges(props.whatSave)}
                        >
                            Zapisz
                    </Button>
                        {props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
                    </>
                    : null
            }
            </div>
        </div>
    )
}

