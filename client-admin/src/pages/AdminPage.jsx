import React, { useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { adminRoutes } from '../routes';

import App from '../app-preview/app';
import DataContext from '../context/card-data.context';
import { useData } from '../hooks/data.hook';
import { useHttp } from '../hooks/http.hook';

import { AuthContext } from '../context/AuthContext';

import './admin-page.scss';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
      '& > * + *': {
         marginTop: theme.spacing(2),
      },
   },
}));

function AdminPage() {
   const routes = adminRoutes();
   const { loading, request } = useHttp()
   const { token } = useContext(AuthContext)
   const classes = useStyles();

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

   if (loading) return <div className={classes.root}><LinearProgress /></div>

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
                     <div className={classes.root}><LinearProgress /></div>
                     :
                     <App
                        theDataObject={dataHook.theDataObject}
                        profileData={dataHook.profile}
                        links={dataHook.links.filter(el => el.active)}
                        design={dataHook.design}
                        products={dataHook.products.filter(el => el.active)}
                     />
               }

            </div>
         </div>
      </DataContext.Provider>
   )
}


export default AdminPage;