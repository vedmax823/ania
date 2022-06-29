import React from 'react';
import { useLocation } from 'react-router-dom';

const CategoryPage = () => {
    const location = useLocation()
    const arr_path = location.pathname.split('/')
    const category = arr_path[2]
    
    return (
        <div>
            {category}
        </div>
    );
};

export default CategoryPage;