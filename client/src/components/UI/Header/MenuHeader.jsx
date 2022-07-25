import React from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE } from '../../../utils/constants';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCategories } from '../../../http/categories';
import MenuList from './MenuList';





const MenuHeader = () => {
    const [menuList, setMenuList] = useState([])
    useEffect(() => {
        getCategories().then(data => {
            setMenuList(data)
        })
    }, [])

    

    
    
    
    return (
        <div className='menu__header'>
            <nav className = "navbar">
            <MenuList categories={menuList} />
                {/* <ul>
                    
                    <li>
                        <Link to={LOGIN_ROUTE}>Категории +</Link>
                        <ul>
                            <li>
                                <a href='/'>Детские + </a>
                                <ul>
                                    <li><a href='/'>Собачий патруль</a></li>
                                    <li><a href='/'>Казки</a></li>
                                </ul>
                                
                            </li>

                            <li><a href='/'>Свадебные</a></li>
                            <li><a href='/'>Мужские</a></li>
                            <li><a href='/'>kjkkjjk</a></li>
                        </ul>
                    </li>

                    <li><Link to={MAINPAGE_ROUTE}>Начинки</Link></li>
                    <li><Link to={ADMIN_ROUTE}>Чизкейки</Link></li>
                    
                </ul> */}
            </nav>
            
        </div>
    );
};

export default MenuHeader;