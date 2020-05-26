import React from 'react';
import styled from 'styled-components';

import lnkdinImg from '../assets/iconmonstr-linkedin-1.svg';
import emailIco from '../assets/email.svg';

const Button = styled.a`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    height: 36px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #fff;
    border-radius: 10px;
    background-color: #2f3542;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    -webkit-transition: -webkit-box-shadow .3s ease, -webkit-transform .3s ease;
    transition: -webkit-box-shadow .3s ease, -webkit-transform .3s ease;
    -o-transition: box-shadow .3s ease, transform .3s ease;
    transition: box-shadow .3s ease, transform .3s ease;
    transition: box-shadow .3s ease, transform .3s ease, -webkit-box-shadow .3s ease, -webkit-transform .3s ease;
    font-weight: 500;
    font-size: 14px;
    line-height: 32px;
    text-align: center;
    text-transform: capitalize;
    letter-spacing: .02px;

    &>img {
      height: 32px;
      width: auto;
      margin: 0;
      -webkit-transform: scale(1.2);
      -ms-transform: scale(1.2);
      transform: scale(1.2)
    }
    
    &>img,
    &>span {
      display: inline-block;
      vertical-align: top;
      pointer-events: none
    }
    
    &>span {
      margin: 0 0 0 8px
    }
  `
const WhatsappButton = styled(Button)`
  background-image: -webkit-gradient(linear, left top, left bottom, from(#60fd7c), to(#07b825));
  background-image: -o-linear-gradient(top, #60fd7c, #07b825);
  background-image: linear-gradient(180deg, #60fd7c, #07b825)
  `;

const TelegramButton = styled(Button)`
background-image: -webkit-gradient(linear,left top,left bottom,from(#00aefa),to(#0983c5));
background-image: -o-linear-gradient(top,#00aefa,#0983c5);
background-image: linear-gradient(180deg,#00aefa,#0983c5);
  `

const MessengerButton = styled(Button)`
  background-image: -webkit-gradient(linear,left top,left bottom,from(#00b1ff),to(#006dfe));
  background-image: -o-linear-gradient(top,#00b1ff,#006dfe);
  background-image: linear-gradient(180deg,#00b1ff,#006dfe);
  `
const ViberButton = styled(Button)`
background-image: -webkit-gradient(linear,left top,left bottom,from(#8760fd),to(#4c389d));
background-image: -o-linear-gradient(top,#8760fd,#4c389d);
background-image: linear-gradient(180deg,#8760fd,#4c389d);
  `;

const SkypeButton = styled(Button)`
background-image: -webkit-gradient(linear,left top,left bottom,from(#00bbf2),to(#007ad4));
    background-image: -o-linear-gradient(top,#00bbf2,#007ad4);
    background-image: linear-gradient(180deg,#00bbf2,#007ad4);
  `

const LinkedInButton = styled(Button)`
background-image: -webkit-gradient(linear,left top,left bottom,from(#2877b5),to(#007ad4));
background-image: -o-linear-gradient(top,#2877b5,#007ad4);
background-image: linear-gradient(180deg,#2877b5,#007ad4);

& > img {
  color: white;
}
  `

const EmailButton = styled(Button)`
  background-image: -webkit-gradient(linear,left top,left bottom,from(#00aefa),to(#0983c5));
  background-image: -o-linear-gradient(top,#00aefa,#0983c5);
  background-image: linear-gradient(180deg,#00aefa,#0983c5);
  `



function whichButton(data) {

  switch (data.messenger) {
    case "WhatsApp":
      return (
        <WhatsappButton href={`https://wa.me/${data.href}`} target="_blank" rel="noopener noreferrer">
          <img src="https://mssg.me/static/webapp/dist/img/messengers/whatsapp.svg" alt="whatsapp.svg icon" />
          <span>{data.messenger}</span>
        </WhatsappButton>
      );

    case "Telegram":
      return (
        <TelegramButton href={`tg://resolve?domain=${data.href}`} target="_blank" rel="noopener noreferrer">
          <img src="https://mssg.me/static/webapp/dist/img/messengers/telegram-new.svg" alt="telegram-new.svg icon" />
          <span>{data.messenger}</span>
        </TelegramButton>
      )

    case "Messenger":
      return (
        <MessengerButton href={`https://m.me/${data.href}`} target="_blank" rel="noopener noreferrer">
          <img src="https://mssg.me/static/webapp/dist/img/messengers/messenger_new.svg" alt="messenger_new.svg icon" />
          <span>{data.messenger}</span>
        </MessengerButton>
      )

    case "Skype":
      return (
        <SkypeButton href={data.href} target="_blank" rel="noopener noreferrer">
          <img src="https://mssg.me/static/webapp/dist/img/messengers/skype.svg" alt="skype.svg icon" />
          <span>{data.messenger}</span>
        </SkypeButton>
      )

    case "Viber":
      return (
        <ViberButton href={data.href} target="_blank" rel="noopener noreferrer">
          <img src="https://mssg.me/static/webapp/dist/img/messengers/viber.svg" alt="viber.svg icon" />
          <span>{data.messenger}</span>
        </ViberButton>
      )

    case "LinkedIn":
      return (
        <LinkedInButton href={data.href} target="_blank" rel="noopener noreferrer">
          <img src={lnkdinImg} alt="viber.svg icon" />
          <span>{data.messenger}</span>
        </LinkedInButton>
      )

    case "Email":
      return (
        <EmailButton href={`mailto:${data.href}`} target="_blank" rel="noopener noreferrer">
          <img src={emailIco} alt="email.svg icon" style={{ height: '70%', color: 'white' }} />
          <span>{data.messenger}</span>
        </EmailButton>
      )

    default:
      return true;
  }
}

function Messengers(props) {
  const messengers = props.data;

  if (!messengers) return null

  return (
    <div id="messengers">
      <ul count={messengers.length} id="card_messengers">
        {
          messengers.map(data => {
            return (
              <li key={data.id}>
                {whichButton(data)}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Messengers;