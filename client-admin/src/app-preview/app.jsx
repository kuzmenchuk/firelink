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
                        {props.design.branding ? <Branding /> : null}
                        <Background data={props.design} />

                        <div>
                            <CardAbout data={props.theDataObject} profile={props.profileData} />
                            <Links data={props.links} />
                            <Products data={props.products} />
                            <BrandingFooter />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;
