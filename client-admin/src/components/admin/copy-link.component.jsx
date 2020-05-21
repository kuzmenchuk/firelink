import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { AppToaster } from '../Toaster';

import { Intent } from "@blueprintjs/core";

function showToast() {
    // create toasts in response to interactions.
    // in most cases, it's enough to simply create and forget (thanks to timeout).
    AppToaster.show({ message: "Link skopiowany.", intent: Intent.PRIMARY });
}

function CopyLink() {
    const [linkValue] = useState('firelink.pl/kuzmenczuk')
    return (
        <CopyToClipboard text={`https://${linkValue}`}
            onCopy={showToast}>
            <input
                className="bp3-input bp3-large bp3-fill copy-link"
                type="text"
                dir="auto"
                readOnly
                value={linkValue}
            />
        </CopyToClipboard>
    )
}

export default CopyLink;