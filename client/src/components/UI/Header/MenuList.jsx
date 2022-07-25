import React from 'react';
import { Link } from 'react-router-dom';
import OneMenuItem from './OneMenuItem';

const MenuList = ({categories}) => {

    return (
        <ul>
            
            {categories.map(item => (
                <OneMenuItem key={item.id} item={item}/>
            )
            )}
        </ul>
    );
};

export default MenuList;