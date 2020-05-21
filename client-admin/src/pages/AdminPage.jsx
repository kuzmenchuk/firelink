import React from 'react';

import { adminRoutes } from '../routes';

import App from '../app-preview/app';
import DataContext from '../context/card-data.context';
import { useData } from '../hooks/data.hook';

import './admin-page.scss';

function AdminPage() {
   const routes = adminRoutes();
   const { save, loading, request, error, clearError, exit, theDataObject, changeProfile, profile, changeDesign, changeLinks, changeMessengers, changeProducts } = useData();

   return (
      <DataContext.Provider value={{ save, loading, request, error, clearError, exit, theDataObject, changeProfile, profile, changeDesign, changeLinks, changeMessengers, changeProducts }}>
         <div className="container">
            <div className="row-left">
               {routes}
            </div>

            <div className="row-right">
               <App
                  theDataObject={theDataObject}
                  profileData={profile}
               />
            </div>
         </div>
      </DataContext.Provider>
   )
}

export default AdminPage;