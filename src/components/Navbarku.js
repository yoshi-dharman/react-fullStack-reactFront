import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { logoutAction } from '../redux/actions/auth.actions';

function Navbarku() {
    const isLogin = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();
    // console.log(isLogin)
    
    const logoutHandle = () => {
        localStorage.clear();
        dispatch(logoutAction());
        history.push('/')
    }

    return (
        <Navbar collapseOnSelect expand="lg"  variant="dark" className="bg-dark">
        <Navbar.Brand href="#home">
        <img
            alt=""
            src={require('../assets/logo.png').default}
            width="30"
            height="30"
            className="d-inline-block align-top"
        />
        </Navbar.Brand>
        {/* <Container> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link to="/" className="nav-link f-bold">Home</Link>
                <div className="horizontal-line d-none d-lg-block"></div>
                <Link to="/submit" className="nav-link f-bold">Submit Image</Link>
            </Nav>
            <Nav className="pr-5">
                {isLogin.isLogged ? 
                    <>
                        <div className="nav-link text-white capitalize f-bold">{JSON.parse(localStorage.payload).name}</div>
                        <div className="horizontal-line d-none d-lg-block"></div>
                        <div><Button onClick={logoutHandle} variant="outline-danger" className="my-btn-outline mx-lg-3 f-bold">Log Out</Button></div>
                    </>
                :
                    <>
                        <Link to="/register" className="nav-link f-bold">Join</Link>
                        <div className="horizontal-line d-none d-lg-block"></div>
                        <Link to="/login" className="nav-link f-bold">Log in</Link>
                    </>
                }
                
                {/* {props.button} */}
            </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
        </Navbar>
    )
}

export default Navbarku
