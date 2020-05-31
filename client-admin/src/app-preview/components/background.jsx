import React from 'react';

import styled from 'styled-components';

//background-image: ${props => props.color};

const StyledBackground = styled.div`
        ${props => props.background}
        position: relative;
        width: 100%;
        height: 100%;
        `;


function Background(props) {
    const { color, isColor, imageUrl } = props.data.background
    const background = () => isColor ? `background-color: ${color};` : `background-image: url(${imageUrl});background-size: cover;background-position: center;`
    return (
        <div id="Background">
            <StyledBackground
                background={background}
            />
        </div>
    )
}

export default Background