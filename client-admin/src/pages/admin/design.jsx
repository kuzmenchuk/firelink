import React, { useContext } from 'react';

import styled from 'styled-components';
import { TwitterPicker, SliderPicker } from 'react-color';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import DataContext from '../../context/card-data.context';

import UploadFiles from '../../components/admin/upload-files.component';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import './design.styles.scss'


const StyledBackground = styled.div`
        background-image: url(${props => props.background});
        background-size: cover;
        background-position: center;
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        `;

function Design() {
    const { design, changeDesign, imagePreview } = useContext(DataContext)


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
                            <h4>Wybierz kolor</h4>
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
                            <h4>Zdjęcie tła</h4>
                            <div className="background-image__section">
                                <div className="background-image">
                                    <StyledBackground
                                        background={imagePreview ? imagePreview : design.background.imageUrl}
                                    />
                                </div>
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <UploadFiles onChange={(event) => changeDesign('add-image', event)} />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        onClick={(event) => changeDesign('delete-image', event)}
                                    >
                                        Usuń
                                    </Button>
                                </div>
                            </div>
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