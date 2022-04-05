import {React, useContext} from "react"
import HeaderSignin from "./Header/HeaderSignin";
import { useState } from "react";
import { Link } from "react-router-dom";
import {Navbar, Container, Nav, Button, Modal, Form, Alert} from 'react-bootstrap'
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./Modal/login";

function Header() {
    let navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null);

    const [stateModal, setStateModal] = useState({
        login: false,
        register:false
    })
   
    //Register
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
      });
    const { name, email, password } = form;
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
        
            // Configuration Content-type
            const config = {
                headers: {
                "Content-type": "application/json",
                },
            };
        
            // Data body
            const body = JSON.stringify(form);
        
            // Insert data user to database
            const response = await API.post("/register", body, config);
        
            // Notification
            if (response.data.status === "success...") {
                const alert = (
                <Alert variant="success" className="py-1">
                    Success
                </Alert>
                );
                setForm({
                name: "",
                email: "",
                password: "",
                });
                setStateModal({ login : true,register : false})
            } else {
                const alert = (
                <Alert variant="danger" className="py-1">
                    Failed
                </Alert>
                );
                setMessage(alert);
            }
            } catch (error) {
            const alert = (
                <Alert variant="danger" className="py-1">
                Failed
                </Alert>
            );
            setMessage(alert);
            console.log(error);
            }
        };
    
    //Login
    
    //Modal
    const onOpenModalRegister = () => {
        setStateModal({ register : true})
    }
    const onOpenModalLogin = () => {
        setStateModal({ login : true})
    }
    const onCloseModalRegister = () => {
        setStateModal({ register : false})
    }
    const onCloseModalLogin = () => {
        setStateModal({ login : false})
    }
    const onAlreadyAccount = () => {
        setStateModal({login : true, register : false})
    }
    const onHaveAccount= () => {
        setStateModal({login : false, register : true})
    }
    
    
    return(
        <>
            {state.isLogin ? <HeaderSignin /> : 
            (
            <Navbar bg= 'white' expand= 'xxl'>
                <Container>
                    <Navbar.Brand href="#home">
                    <Link to="/"><img
                        src="/Images/Logo.png"
                        width="75"
                        height="75"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"/>
                    </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="ms-auto d-flex align-items-end gap-2">
                            <Button onClick={onOpenModalLogin} variant="outline-danger">Login</Button>{' '}
                            <Button onClick={onOpenModalRegister} variant="danger">Register</Button>{' '}      
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            )}
        <Modal size="sm" show={stateModal.register} onHide={onCloseModalRegister}>
                <Modal.Body>
                    <Modal.Title className="fw-bold text-danger">Register</Modal.Title>
                    {message && message}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="email" placeholder="Email" value={email} name="email" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicFullName">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="text" placeholder="Fullname" value={name} name="name" onChange={handleChange}/>
                        </Form.Group>
                        <div className="d-grid text-center">
                        <Button variant="danger" width="100%" type="submit">
                            Register
                        </Button>
                        <Form.Text>Already have an account ? Click <a onClick={onAlreadyAccount} className="fw-bold text-dark" style={{textDecoration:"none", cursor:"pointer"}}>Here</a></Form.Text>
                        </div>
                        
                    </Form>
                </Modal.Body>
            </Modal>
            <ModalLogin size="sm" show={stateModal.login} handleClose={onCloseModalLogin} onHaveAccount={onHaveAccount} setModal={setStateModal}/>
        </>
    )
}

export default Header