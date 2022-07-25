import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/UI/Header/Header';

const CategoryPage = () => {
    const location = useLocation()
    const arr_path = location.pathname.split('/')
    const category = arr_path[2]
    
    return (
        <div>
            <Header />
            {category}
        </div>
    );
};

export default CategoryPage;