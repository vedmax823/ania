import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegram } from "@fortawesome/free-brands-svg-icons"
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import MenuHeader from './MenuHeader';
import AuthModal from '../../Modals/AuthModal';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { ADMIN_ROUTE, CABINET_ROUTE } from '../../../utils/constants';
import { refreshUser } from '../../../http/userAPI';
import {destroyUser, setUser} from '../../../slicers/userSlice'

const Header = () => {
    const user = useSelector(state => state.user.data)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);

    useEffect(() => {
        refreshUser()
            .then(response => {
                localStorage.setItem('token', response.data.accessToken);
                dispatch(setUser(response.data.user))
            })
            .catch(err => {
                console.log(err)
                if (err.response?.status == 401){
                    dispatch(destroyUser())
                    localStorage.removeItem('token')
                    localStorage.setItem('auth', false)
                }
            })
        
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleExit = () => {
        localStorage.removeItem('token')
        localStorage.setItem('auth', false)
        dispatch(destroyUser())
        
    }

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
                        {
                            user.isAdmin && 
                            <div className="cabinet_button">
                                <Link to={ADMIN_ROUTE}> Адміністрування </Link>
                            </div>
                        }
                        {user.isLogin ?
                            <React.Fragment>
                                <div className="cabinet_button">
                                    <Link to={CABINET_ROUTE} > Кабінет </Link>
                                </div>
                                <div className="cabinet_button" onClick={handleExit }>
                                     Вийти
                                </div>
                            </React.Fragment>
                            : 
                            <div className="cabinet_button" onClick={handleShow}>
                                Ввійти
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