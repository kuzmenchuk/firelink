import React from 'react';
import { Link } from 'react-router-dom';

// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import Divider from '@material-ui/core/Divider';
// import InboxIcon from '@material-ui/icons/Inbox';
// import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';


import { MdKeyboardArrowRight } from 'react-icons/md';

// function ListItemLink(props) {
//   return <ListItem button component={Link} {...props} />;
// }

export default function MenuItem(props) {

  // return (
  //   <ListItemLink to={props.linkToHref}>
  //     <ListItemIcon>
  //       <InboxIcon />
  //     </ListItemIcon>
  //     <ListItemText primary={props.linkToName} />
  //     <ListItemIcon>
  //       <ChevronRightOutlinedIcon />
  //     </ListItemIcon>
  //   </ListItemLink>

  // )

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

