import React from 'react';
import './styles.scss';

import Branding from './components/branding';
import BrandingFooter from './components/branding-footer';
import Background from './components/background';
import CardAbout from './components/card-about';
import Links from './components/links';
import Products from './components/products';


function App(props) {

    return (
        <div className="Outter1">
            <div className="Outter2">

                <div id="CardRoot">
                    <div className="CardRoot_Inner">
                        <Branding />
                        <Background data={props.theDataObject.design} />

                        <div>
                            <CardAbout data={props.theDataObject} profile={props.profileData} />
                            <Links data={props.theDataObject.links} />
                            <Products data={props.theDataObject.products} />
                            <BrandingFooter />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
