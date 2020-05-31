import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
    },
}));

const UploadFiles = (props) => {
    const classes = useStyles();

    return (
        <div>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name="photofile"
                onChange={props.onChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
                    Upload
                </Button>
            </label>
            {/* <img src={url} /> */}
        </div>
    )
}

export default UploadFiles;