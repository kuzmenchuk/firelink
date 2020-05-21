import React from 'react';
import Messengers from './messengers';

function CardAbout(props) {
  const { messengers } = props.data;
  const profileAbout = props.profile

  return (
    <div id="CardInfo">
      <div id="name">
        <div className="avatar">
          <img src={profileAbout.photoUrl} alt={profileAbout.fullname} />
        </div>
        <div className="name">
          <h1>{profileAbout.fullname}</h1>
        </div>
      </div>

      <div id="description">
        <p>{profileAbout.description}</p>
      </div>

      <Messengers data={messengers} />

    </div>
  )
}

export default CardAbout;