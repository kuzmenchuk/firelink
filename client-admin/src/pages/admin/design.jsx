import React, { useContext } from 'react';
import { Switch } from '@blueprintjs/core';
import { TwitterPicker, SliderPicker } from 'react-color';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';




function Design() {
    const { design, changeDesign } = useContext(DataContext)



    return (
        <DataChangingTemplate
            pageName='Wygląd linku'
            whatSave='design'
        >
            <main className="about-page">
                <Switch checked={design.background.isColor} label={design.background.isColor ? 'Kolor' : 'Zdjęcie'} onChange={() => changeDesign('isColor', !design.background.isColor)} />
                <h3>Wybierz kolor</h3>
                <TwitterPicker
                    triangle="hide"
                    width='100%'
                    color={design.background.color}
                    onChangeComplete={(color) => changeDesign('color', color.hex)}
                />
                <br />
                <SliderPicker
                    color={design.background.color}
                    onChange={(color) => changeDesign('color', color.hex)}
                />
                <br />
                <br />
                <br />

                <div className="form-group files color">
                    <label>Wybierz zdjęcie</label>
                    <input type="file" name="photofile" onChange={(event) => changeDesign('add-image', event)} className="form-control" multiple="" />
                </div>

                <Switch checked={design.branding} label={'Branding'} onChange={() => changeDesign('branding', !design.branding)} />
            </main>
        </DataChangingTemplate>
    )
}

export default Design;