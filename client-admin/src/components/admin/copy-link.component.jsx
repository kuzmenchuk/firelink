import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import TouchAppOutlinedIcon from '@material-ui/icons/TouchAppOutlined';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import DataContext from '../../context/card-data.context';
import { useMessage } from '../../hooks/message.hook';

function CopyLink() {
    const { showToast } = useMessage();
    const { theDataObject } = useContext(DataContext)

    return (
        <CopyToClipboard
            text={`https://firelink.pl/${theDataObject.linkname}`}
            onCopy={() => showToast('Link jest skopiowany!', 'primary')}
        >
            {/* <input
                className="bp3-input bp3-large bp3-fill copy-link"
                type="text"
                dir="auto"
                readOnly
                value={linkValue}
            /> */}
            <TextField
                id="outlined-read-only-input"
                label="Skopiować link"
                value={`firelink.pl/${theDataObject.linkname}`}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <TouchAppOutlinedIcon />
                        </InputAdornment>
                    )
                }}
                variant="outlined"
                className="copy-link-input"
            />
        </CopyToClipboard>
    )
}

export default CopyLink;