import React, { useEffect } from 'react';
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { getCategories } from '../../../http/categories';
import CategoryModal from '../../Modals/CategoryModal';
import CatrgoriesList from './CatrgoriesList';

const MenuAdmin = () => {

    const [categories, setCategories] = useState([])
    const [showCategoruModal, setShowCategoryModal] = useState(false)
    const handleClose = () => setShowCategoryModal(false)
    const handleShow = () => setShowCategoryModal(true)


    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])
    return (
        <React.Fragment>
            <div className="p-2">
                
                <Alert variant={'info'} className="p-2 mb-1">
                    Категорії
                </Alert>
                <div>
                    
                    <Button 
                        className="btn-sm m-0"
                        onClick={handleShow}
                    >
                        Нова катеогрія
                    </Button>
                </div>
                <div className='col-12 d-flex justify-content-center'>
                    <CatrgoriesList categories={categories} />
                </div>
            </div>
            <CategoryModal show={showCategoruModal} handleClose={handleClose} setCategories={setCategories}/>
        </React.Fragment>
    );
};

export default MenuAdmin;