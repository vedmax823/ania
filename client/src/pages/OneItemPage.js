import React from 'react';
import { useLocation } from 'react-router-dom';

const OneItemPage = () => {
    const location = useLocation()
    const arr_path = location.pathname.split('/')
    const category = arr_path[2]
    const id = arr_path[3]
    return (
        <div>
            {category} / {id}
        </div>
    );
};

export default OneItemPage;