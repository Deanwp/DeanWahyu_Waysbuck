import React from "react";
import {Navbar, Container, Nav, Button, Modal, Form,} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../config/api";
import { FloatingLabel } from "react-bootstrap";


function AddAddress() {
    let navigate = useNavigate()
    const [form, setForm] = useState({
    name: "",
    phone: "",
    postCode: "",
    address: "",
  });
  const { name, phone, postCode, address } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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

      // Store data with FormData as object
      const body = JSON.stringify(form)

      // Insert product data
      const response = await API.post("/shipping", form, config);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

    return(
        <Container>
            
            <div className="row">
                <div className="mt-5">
                    <h1 className="mt-5 mb-5 text-danger">Add Address</h1>
                    <Form className="align-item-center" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="text" placeholder="Name" name="name" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="number" placeholder="Phone" name="phone" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="number" placeholder="Postcode"  name="postCode" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3 text-dark" controlId="form">
                        <FloatingLabel controlId="floatingTextarea2" label="Address" style={{backgroundColor:"whitesmoke"}}>
                            <Form.Control
                            onChange={handleChange}
                            name="address"
                            className="formInput"
                            as="textarea"
                            style={{ height: '200px' }}
                            />
                        </FloatingLabel>
                        </Form.Group>
                        <div className="d-grid text-center">
                        <Button variant="danger" width="100%" type="submit">
                            Add Address
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default AddAddress