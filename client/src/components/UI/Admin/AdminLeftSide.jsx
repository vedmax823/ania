import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ADMIN_FELLINGS_ROUTE, ADMIN_MENU_ROUTE, ADMIN_PRODUCTS_ROUTE, ADMIN_USERS_ROUTE } from '../../../utils/constants';

const AdminLeftSide = () => {
    return (
        <div>
            <ListGroup variant="flush">
                <ListGroup.Item><Link to={ADMIN_FELLINGS_ROUTE}>Начинки</Link></ListGroup.Item>
                <ListGroup.Item><Link to={ADMIN_MENU_ROUTE}>  Категорії</Link></ListGroup.Item>
                <ListGroup.Item><Link to={ADMIN_PRODUCTS_ROUTE}>Продукція</Link></ListGroup.Item>
                <ListGroup.Item><Link to={ADMIN_USERS_ROUTE}>Користувачі</Link></ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default AdminLeftSide;