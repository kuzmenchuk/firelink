import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import InputFields from '../../components/admin/input-fields.component';
import UploadFiles from '../../components/admin/upload-files.component';

import './profile.styles.scss';

function About() {
  const { profile, changeProfile, imagePreview } = useContext(DataContext)

  return (
    <DataChangingTemplate
      pageName='Twój profil'
      whatSave='profile'
    >
      <main className="about-page">

        <h4>Zdjęcie profilu</h4>
        <div className="avatar__section">
          <div className="avatar">
            <img src={imagePreview ? imagePreview : profile.photoUrl} alt={profile.fullname} />
          </div>
          <UploadFiles onChange={(event) => changeProfile('add-image', event)} />
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={(event) => changeProfile('delete-image', event)}
          >
            Usuń
          </Button>
          {
            imagePreview && (
              <Button
                variant="contained"
                color="secondary"
                onClick={(event) => changeProfile('reset-image', event)}
              >
                Resetuj
              </Button>
            )
          }
        </div>

        <InputFields
          name='fullname'
          input
          placeholder='Twoje Imię'
          label='Imię'
          onChange={event => changeProfile('form-data', event)}
          value={profile.fullname}
          maxLength='35'
        />
        <InputFields
          name='description'
          placeholder='Opis'
          label='Opis'
          onChange={event => changeProfile('form-data', event)}
          value={profile.description}
          maxLength='350'
        />


      </main>
    </DataChangingTemplate>
  )
}

export default About;