import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { createNewCategoty, getCategotyList } from '../../http/admin';
import { getCategories } from '../../http/categories';
import MySelect from '../UI/MySelect/MySelect';

const CategoryModal = ({show, handleClose, setCategories}) => {
    const [categoriesList, setCategoriesList] = useState([]) 
    const [name, setName] = useState('')
    const [link, setLinkName] = useState('')
    const [fatherId, setFatherId] = useState(-1)
    useEffect(() => {
        getCategotyList().then(data => setCategoriesList(data))
        .catch((e) => {
            console.log(e.response.data)
        })
    }, [])

    const createCategory = async () => {
        try{
            const newCategoryObj = {name, id_father : fatherId, link}
            //console.log(newCategoryObj)
            let newCategory = await createNewCategoty(newCategoryObj)
            if (newCategory){
                //console.log(newCategory)
                handleClose()
            }
            getCategories().then(data => setCategories(data))

        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Нова категорія</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                    <Form.Group className="mb-2" as={Row}>
                        <Form.Label column sm="3">
                            Батьківська
                        </Form.Label>
                        <Col sm="9">
                            <MySelect data={categoriesList} value={fatherId} onChange = {setFatherId}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm="3">
                            Назва
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Назва" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    

                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm="3">
                            Посилання
                        </Form.Label>
                        <Col sm="9">
                        <Form.Control type="text" placeholder="link" value={link} onChange={(e) => setLinkName(e.target.value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрити
            </Button>
            <Button variant="primary" onClick={createCategory}>
                Зберегти
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CategoryModal;