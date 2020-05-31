import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import InputFields from '../../components/admin/input-fields.component';

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

        <div className="form-group files color">
          <label>Wybierz swoje zdjęcie</label>
          <input type="file" name="photofile" onChange={event => changeProfile('image', event)} className="form-control" multiple="" />
        </div>

      </main>
    </DataChangingTemplate>
  )
}

export default About;