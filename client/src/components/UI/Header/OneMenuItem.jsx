import React from 'react';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';

const OneMenuItem = ({item}) => {

    return (
        <React.Fragment>
            <li><Link to={`/products/${item.link}`}>{item.name}</Link>
                {item.childList && <MenuList categories={item.childList}/>}
            </li>
        </React.Fragment>
        
    );
};

export default OneMenuItem;