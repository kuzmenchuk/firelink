import React, { useEffect, useState, useCallback, useContext } from 'react';

import { adminRoutes } from '../routes';

import App from '../app-preview/app';
import DataContext from '../context/card-data.context';
import { useData } from '../hooks/data.hook';
import { useHttp } from '../hooks/http.hook';

import { AuthContext } from '../context/AuthContext';

import './admin-page.scss';

function AdminPage() {
   const routes = adminRoutes();
   const { loading, request } = useHttp()
   const { token } = useContext(AuthContext)

   const { save, loadingApi, error, clearError, exit, theDataObject, setTheDataObject, changeProfile, profile, changeDesign, changeLinks, changeMessengers, changeProducts } = useData();

   useEffect(() => {
      async function fetchData() {
         try {
            const fetched = await request('/api/data-change/get-data', 'GET', null, {
               Authorization: `Bearer ${token}`
            })

            setTheDataObject(fetched.card)
         } catch (e) { }
      }
      fetchData()
   }, [token, request])

   if (loading) return <h1>Loading BLYA...</h1>

   return (
      <DataContext.Provider value={{ save, loadingApi, error, clearError, exit, theDataObject, changeProfile, profile, changeDesign, changeLinks, changeMessengers, changeProducts }}>
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