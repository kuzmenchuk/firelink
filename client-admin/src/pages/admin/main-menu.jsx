import React, { useContext } from 'react';

// import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import { AuthContext } from '../../context/AuthContext';

import Copylink from '../../components/admin/copy-link.component';
import MenuItem from '../../components/admin/menu-item.component';

import { FiUser, FiLink } from 'react-icons/fi'
import { GiPencilBrush } from 'react-icons/gi'
import { IoMdChatboxes } from 'react-icons/io'
import { BsCardChecklist } from 'react-icons/bs'


const MENU_ITEMS = [
    {
        linkToHref: '/profile/about',
        linkToName: 'Informacja o sobie',
        ico: () => <FiUser />,
        key: 1
    },
    {
        linkToHref: '/profile/design',
        linkToName: 'Wygląd linku',
        ico: () => <GiPencilBrush />,
        key: 2
    },
    // {
    //     linkToHref: '/profile/m',
    //     linkToName: 'Messengery',
    //     ico: () => <IoMdChatboxes />,
    //     key: 3
    // },
    {
        linkToHref: '/profile/links',
        linkToName: 'Twoje linki',
        ico: () => <FiLink />,
        key: 4
    },
    {
        linkToHref: '/profile/products',
        linkToName: 'Karteczki produktów',
        ico: () => <BsCardChecklist />,
        key: 5
    }
]

function MainMenu() {
    const auth = useContext(AuthContext)
    const logout = auth.logout;

    return (
        <div style={{ display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <h2 className="header__hi">Cześć, Dimon!</h2>
                <Copylink />
                <ul className="menu-items">
                    {
                        MENU_ITEMS.map(i => <MenuItem key={i.key} linkToHref={i.linkToHref} linkToName={i.linkToName} ico={i.ico} />)
                    }
                </ul>
            </div>
            <div style={{ paddingBottom: '10px' }}>
                <Button
                    variant="contained"
                    color="default"
                    onClick={logout}
                //startIcon={<CloudUploadIcon />}
                >
                    Wyloguj się
                </Button>
            </div>
        </div>
    )
}

export default MainMenu;