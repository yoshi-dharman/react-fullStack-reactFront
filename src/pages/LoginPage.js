import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Spinner, Form, Button } from 'react-bootstrap';

import { loginAction } from '../redux/actions/auth.actions';

function LoginPage(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginLoading = useSelector(state => state.auth);

    const [login, setLogin] = useState({
        name: "",
        password: ""
    })

    const handleChange= (e) => {
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    
    useEffect(() => {
        if(props.location.state !== undefined){
            // console.log(props.location.state.alert);
            alert(props.location.state.alert);
            history.push('/login')
        }
    }, [props, history])

    return (
        <Container >
        <Row className="text-center mt-5">
            <Col>
                <h3>Log In ArtShare</h3>
            </Col>     
        </Row>
        <Row className="justify-content-center mt-4">
            <Col md={6}>
                {loginLoading.isLoading === true ?
                <div className="text-center">
                    <Spinner className="mt-3" animation="border" />
                </div>
                :
                <Form onSubmit={(e) => dispatch(loginAction(login, e, history, setLogin))}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required value={login.name} onChange={handleChange} name="name" type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required value={login.password} onChange={handleChange} name="password" type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button type="submit" className="my-btn">
                    Log In
                </Button>
                </Form>
                }
            </Col>
        </Row>
        </Container>
    )
}

export default LoginPage
