import React, { useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useMessage } from '../../hooks/message.hook';

function CopyLink() {
    const { showToast } = useMessage();
    const [linkValue] = useState('firelink.pl/kuzmenczuk')
    return (
        <CopyToClipboard text={`https://${linkValue}`}
            onCopy={() => showToast('Link jest skopiowany!', 'primary')}>
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