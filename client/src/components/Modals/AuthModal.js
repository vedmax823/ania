import React, {useState} from 'react';
import {Modal, Button, Form ,Col, Row} from 'react-bootstrap'
import { loginUser } from '../../http/userAPI';
import jwt_decode from "jwt-decode";
import {useDispatch} from 'react-redux'
import { setUser } from '../../slicers/userSlice';


const AuthModal = ({show, handleClose}) => {
    const dispatch = useDispatch()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const makeLogin = async () => {
        try {
            const loginObj = {email, password, device_data : {
                browser : "chrome",
                os : "macOS",
                device : "MACBOOK1"
            }}
            console.log(email, password)
            const data = await loginUser(loginObj)
            //console.log(jwt_decode(data.accessToken))
            const user = jwt_decode(data.accessToken)
            dispatch(setUser(user))
        }
        catch(e){
            console.log(e.response.data)
        }
    }
    return (<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Вхід до особистого кабінету</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="col-12 d-flex justify-content-center mb-3">
                    <div>Вхід</div><div  className='mx-4'>|</div><div> Реєстрація</div>
                </div>
                
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2">
                        Email
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="email" placeholder="email@gmail.com" onChange={(e) => setEmail(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="2">
                        Password
                        </Form.Label>
                        <Col sm="10">
                        <Form.Control type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)}/>
                        </Col>
                    </Form.Group>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={makeLogin}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>)
  };

export default AuthModal;