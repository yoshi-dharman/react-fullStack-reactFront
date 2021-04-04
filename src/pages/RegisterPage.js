import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';

import { registerAction } from '../redux/actions/auth.actions';

function RegisterPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const registerLoading = useSelector(state => state.auth);

    const [register, setRegister] = useState({
        name: "",
        password: ""
    })

    const handleChange= (e) => {
        setRegister({
            ...register,
            [e.target.name] : e.target.value
        })
    }

    return (
        <Container >
        <Row className="text-center mt-5">
            <Col>
                <h3>Join ArtShare</h3>
            </Col>     
        </Row>
        <Row className="justify-content-center mt-4">
            <Col md={6}>
                {registerLoading.isLoading === true ?
                <div className="text-center">
                    <Spinner className="mt-3" animation="border" />
                </div>
                :
                <Form onSubmit={(e) => dispatch(registerAction(register, e, history, setRegister))}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required value={register.name} onChange={handleChange} name="name" type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value={register.password} onChange={handleChange} name="password" type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button type="submit" className="my-btn">
                    Join
                </Button>
                </Form>
                }
            </Col>
        </Row>
        </Container>
    )
}

export default RegisterPage
