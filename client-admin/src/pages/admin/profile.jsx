import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import InputFields from '../../components/admin/input-fields.component';
import UploadFiles from '../../components/admin/upload-files';

import './profile.styles.scss';

function About() {
  const { profile, changeProfile } = useContext(DataContext)

  return (
    <DataChangingTemplate
      pageName='Informacje o sobie'
      whatSave='profile'
    >
      <main className="about-page">
        <InputFields
          name='fullname'
          input
          placeholder='Twoje Imię'
          label='Imię'
          onChange={event => changeProfile('form-data', event)}
          value={profile.fullname}
        />
        <InputFields
          name='description'
          placeholder='Opis'
          label='Opis'
          onChange={event => changeProfile('form-data', event)}
          value={profile.description}
        />

        <UploadFiles onChange={(event) => changeProfile('add-image', event)} />


      </main>
    </DataChangingTemplate>
  )
}

export default About;