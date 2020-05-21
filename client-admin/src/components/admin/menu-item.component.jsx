import React from 'react';
import { Link } from 'react-router-dom';

import { MdKeyboardArrowRight } from 'react-icons/md';

export default function MenuItem(props) {

  return (
    <li className="menu-items__item">
      <Link to={props.linkToHref}>
        <span className="menu-items__item-ico">{props.ico()}</span>
        <span className="menu-items__item-text">
          {props.linkToName}
        </span>
        <span className="menu-items__item-arrow">
          <MdKeyboardArrowRight />
        </span>
      </Link>
    </li>
  )
}

