import {React, useContext} from "react"
import { useState } from "react";
import {Navbar, Container, Nav, Button, Modal, Form, Alert} from 'react-bootstrap'
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import { useNavigate } from "react-router-dom";


export default function ModalLogin({show, handleClose, onHaveAccount}) {
    let navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
        email: "",
        password: "",
      }); 
    
    const { email, password } = form;
    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
    
    const handleSubmit = async (e) => {
        try {
          e.preventDefault();
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          // Data body
          const body = JSON.stringify(form);
    
          // Insert data for login process
          const response = await API.post("/login", body, config);
    
          // Checking process
          if (response?.status === 200) {
            // Send data to useContext
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: response.data.data,
            });
            
            // Status check
            if (response.data.data.role === "admin") {
              navigate("/adminpage");
            } else {
              navigate("/");
            }
            console.log(response.data.data.role);
            const alert = (
              <Alert variant="success" className="py-1">
                Login success
              </Alert>
            );
            setForm({
                email : '',
                password: ''
              });
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1">
              Login failed
            </Alert>
          );
          setMessage(alert);
          console.log(error);
        }
      };
    
    return (
        <Modal size="sm" show={show} onHide={handleClose}>
                <Modal.Body>
                    <Modal.Title className="fw-bold text-danger">Login</Modal.Title>
                    {message && message}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="email" placeholder="Email"  value={email} name="email" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="password" placeholder="Password" value={password} name="password" onChange={handleChange}/>
                        </Form.Group>

                        <div className="d-grid text-center">
                        <Button variant="danger" width="100%" type="submit" onClick={handleClose}>
                            Login
                        </Button>
                        <Form.Text>Don't have an account ? Click <a onClick={onHaveAccount} className="fw-bold text-dark" style={{textDecoration:"none", cursor:"pointer"}}>Here</a></Form.Text>
                        </div>
                    </Form>
                </Modal.Body>
        </Modal>
    )
}
