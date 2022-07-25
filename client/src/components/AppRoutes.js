import React from 'react';
import { useSelector } from 'react-redux';
import {Routes, Route} from 'react-router-dom'
import { adminRoutes, authRoutes, publickRoutes } from '../routes';



const AppRoutes = () => {
    const user = useSelector(state => state.user.data)
    return (
        <Routes >
            
            {
                user.isAdmin && 
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
                user.isLogin && 
                authRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
            }
            {
                publickRoutes.map(route => <Route path={route.path} element={route.element} key={route.path}/>)
            }
            
        </Routes>
    );
};

export default AppRoutes;