import React, { useEffect, useContext } from 'react';

import { Spinner } from '@blueprintjs/core';

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

   const dataHook = useData();

   useEffect(() => {
      async function fetchData() {
         try {
            const fetched = await request('/api/data-change/get-data', 'GET', null, {
               Authorization: `Bearer ${token}`
            })

            dataHook.setTheDataObject(fetched.card)
         } catch (e) { }
      }
      fetchData()
   }, [token, request])

   if (loading) return <Spinner intent='none' size={70} />

   return (
      <DataContext.Provider value={dataHook}>
         <div className="container">
            <div className="row-left">
               {routes}
            </div>

            <div className="row-right">
               {
                  loading
                     ?
                     <Spinner intent='none' size={70} />
                     :
                     <App
                        theDataObject={dataHook.theDataObject}
                        profileData={dataHook.profile}
                        links={dataHook.links}
                     />
               }

            </div>
         </div>
      </DataContext.Provider>
   )
}


export default AdminPage;