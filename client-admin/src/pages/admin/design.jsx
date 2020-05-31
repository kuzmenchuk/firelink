import React, { useContext } from 'react';

import { TwitterPicker, SliderPicker } from 'react-color';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import DataContext from '../../context/card-data.context';

import UploadFiles from '../../components/admin/upload-files';

import DataChangingTemplate from '../../templates/data-changing-page.template';



function Design() {
    const { design, changeDesign } = useContext(DataContext)


    return (
        <DataChangingTemplate
            pageName='Wygląd linku'
            whatSave='design'
        >
            <main className="design">
                <Typography component="div">
                    <Grid
                        component="label"
                        container
                        alignItems="center"
                        spacing={1}
                        className="color-img-checker"
                    >
                        <Grid item>Kolor</Grid>
                        <Grid item>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={!design.background.isColor}
                                        onChange={() => changeDesign('isColor', !design.background.isColor)}
                                        name="checkedB"
                                        color="default"
                                        inputProps={{ 'aria-label': 'checkbox with default color' }}
                                        style={{ margin: 0 }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item>Zdjęcie</Grid>
                    </Grid>
                </Typography>
                {
                    design.background.isColor ?
                        <>
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
                        </> :
                        <>
                            <br />
                            <br />
                            <UploadFiles onChange={(event) => changeDesign('add-image', event)} />
                            <br />
                            <br />
                        </>
                }
                <FormControlLabel
                    control={
                        <Switch
                            checked={design.branding}
                            onChange={() => changeDesign('branding', !design.branding)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Branding"
                />
            </main>
        </DataChangingTemplate>
    )
}

export default Design;