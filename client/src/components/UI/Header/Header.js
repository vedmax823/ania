import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import MenuHeader from './MenuHeader';
import AuthModal from '../../Modals/AuthModal';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, CABINET_ROUTE } from '../../../utils/constants';

const Header = () => {
    const user = useSelector(state => state.user.data)
    console.log(user)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
                <div className='header'>
                    <div className='header__first'>
                        <div>
                            <a href="/" className='logo'>VEDERNIKOVA</a>
                        </div>
                        <div className="phone__social">
                            <div>
                                +380637363008
                            </div>
                            <div className='div__sossial'>
                                <FontAwesomeIcon icon={faTelegram} size="2x"/>
                                <FontAwesomeIcon icon={faInstagram} size="2x"/>
                            </div>
                        </div>
                        {user.isLogin ?
                            <div className="cabinet_button">
                                <Link to={CABINET_ROUTE} > Кабінет </Link>
                            </div>
                            : 
                            <div className="cabinet_button" onClick={handleShow}>
                                Ввійти
                            </div>
                        }
                        
                        {
                            user.isAdmin && 
                            <div className="cabinet_button">
                                <Link to={ADMIN_ROUTE}> Адміністрування </Link>
                            </div>
                        }
                    </div>
                    
                    <MenuHeader />
                    
                </div>
                <AuthModal show={show} handleClose={handleClose}/>

                {/* <LoginModal show={show} handleClose={handleClose} /> */}

                
                
            </div>
    );
};

export default Header;