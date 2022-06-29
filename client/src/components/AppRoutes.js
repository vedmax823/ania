import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publickRoutes } from '../routes';



const AppRoutes = () => {
    const isAdmin = true;
    const isAuth = true;

    return (
        <Routes >
            
            {
                isAdmin && 
                adminRoutes.map(route => 
                    <Route path={route.path} element={route.element} key={route.path}>
                        {route.childList.map(childRoute =>
                            
                            <Route path ={childRoute.path} element={childRoute.element} key={childRoute.path}>

                            </Route>
                        )}
                    </Route>
                )
            }
            
            {
                isAuth && 
                authRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
            }
            {
                publickRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
            }
            
        </Routes>
    );
};

export default AppRoutes;