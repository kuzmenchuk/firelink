import React, { useContext } from 'react';

import DataContext from '../../context/card-data.context';

import DataChangingTemplate from '../../templates/data-changing-page.template';

import InputFields from '../../components/admin/input-fields.component';

function About() {
  const { profile } = useContext(DataContext)

  return (
    <DataChangingTemplate
      pageName='Informacje o sobie'
    >
      {
        changeHandler => (
          <main className="about-page">
            <InputFields
              name='fullname'
              input
              placeholder='Twoje Imię'
              label='Imię'
              onChange={changeHandler}
              value={profile.fullname}
            />
            <InputFields
              name='description'
              placeholder='Opis'
              label='Opis'
              onChange={changeHandler}
              value={profile.description}
            />
            <input type="file" name="photofile" onChange={changeHandler} />
          </main>
        )
      }
    </DataChangingTemplate>
  )
}

export default About;