import React from 'react';
import styled from 'styled-components';


const MainDiv = styled.div`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
justify-content: center;
padding: 0 16px 16px;
text-align: center;
color: #302206;
font-size: 12px;
opacity: .7;
  `

const ButtonLink = styled.a`
text-decoration: none;
color: #000;
`


function BrandingFooter() {
    return (
        <MainDiv>
            <p>Stworzono w Gdyni przez <ButtonLink href="https://kuzmenczuk.dev" target="_blank" rel="noopener noreferrer" >kuzmenczuk.dev</ButtonLink></p>
        </MainDiv>
    )
}

export default BrandingFooter;