import React from 'react';
import styled from 'styled-components';


const MainDiv = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 58px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
z-index: 1;
padding: 0 16px;
background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.3)),to(transparent));
background-image: -o-linear-gradient(top,rgba(0,0,0,.3),transparent);
background-image: linear-gradient(180deg,rgba(0,0,0,.3),transparent);
  `

const ButtonLink = styled.a`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
height: 36px;
padding: 0 14px;
border: 2px solid #fff;
font-weight: 500;
font-size: 14px;
border-radius: 10px;
-webkit-transition: background-color .3s ease,color .3s ease;
-o-transition: background-color .3s ease,color .3s ease;
transition: background-color .3s ease,color .3s ease;
text-decoration: none;
color: #fff;

@media (min-width: 1200px) {
&:hover {
    background-color: #fff;
    color: #000;
}
}
`


function Branding() {
  return (
    <MainDiv>
      <div></div>
      <ButtonLink href="http://ec2-52-15-195-225.us-east-2.compute.amazonaws.com/" target="_blank" rel="noopener noreferrer" >Stwórz swoją e-wizytówkę</ButtonLink>
    </MainDiv>
  )
}

export default Branding;