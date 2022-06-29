import React from 'react';
import './navbar.css'
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, MAINPAGE_ROUTE } from '../../../utils/constants';
//import { getCategories } from '../../http/interfaceAPI';




const MenuHeader = () => {
    // const [menuList, setMenuList] = useState([])
    // useEffect(() => {
    //     getCategories().then(data => {
    //         setMenuList(data)
    //         console.log(data)
    //     })
    // }, [])

    
    
    
    return (
        <div className='menu__header'>
            <nav className = "navbar">
                <ul>
                    {/* {
                        menuList.map(item => {
                            return <li key={item.id}><Link to={MAINPAGE_ROUTE} key={item.id}>{item.name}</Link></li>
                        })
                    } */}
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
                    <li><Link to="/subcategory">Подкатегория</Link></li>
                    <li><Link to="category">чизкейки</Link></li>
                    <li><Link to="dashboard">Дашбоард</Link></li>
                    <li><Link to="team">Дашбоард2</Link></li>
                </ul>
            </nav>
            
        </div>
    );
};

export default MenuHeader;