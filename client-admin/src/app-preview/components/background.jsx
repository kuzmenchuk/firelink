import React from 'react';

import styled from 'styled-components';

const StyledBackground = styled.div`
        background-image: ${props => props.color};
        position: relative;
        width: 100%;
        height: 100%;
        `;


function Background(props) {

    return (
        <div id="Background">
            <StyledBackground color={props.data.background.color} />
        </div>
    )
}

export default Background