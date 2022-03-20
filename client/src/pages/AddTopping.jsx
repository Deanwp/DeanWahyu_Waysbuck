import React from "react";
import {Navbar, Container, Nav, Button, Modal, Form,} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API } from "../config/api";

function AddTopping() {
    let navigate = useNavigate()
    const [preview, setPreview] = useState(null)
    const [form, setForm] = useState({
    image: "",
    title: "",
    price: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].title);
      formData.set("title", form.title);
      formData.set("price", form.price);

      console.log(form);

      // Insert product data
      const response = await API.post("/topping", formData, config);
      console.log(response);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
    return(
        <Container>
            
            <div className="row">
                <div className="col-7 mt-5">
                    <h1 className="mt-5 mb-5 text-danger">Topping</h1>
                    <Form className="align-item-center" onSubmit={handleSubmit}>
                        <Form.Group className="mb-4 mt-5" controlId="formToppingName">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className='formInput' type="text" placeholder="Topping Name" name="title" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-4 mt-4" controlId="formToppingPrice">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className='formInput' type="text" placeholder="Price" name="price" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-4 mt-4" controlId="formToppingPhoto">
                            <div className="input-image form-group " style={{backgroundColor:"whitesmoke"}}>
                                <label for="upload" className="d-flex justify-content-between align-text-center">
                                    <p className="m-0">Topping Photo</p>
                                    <img src="/images/imageIcon.png" alt="" width="20px" height='30px'  />
                                </label>
                                <input type="file" id="upload" name="image" hidden onChange={handleChange}/>
                            </div>
                        </Form.Group>
                        <div className="d-grid col-10 mx-auto">
                        <Button variant="danger" width="100%" className="" type="submit">
                            Add Topping
                        </Button>
                        </div>
                    </Form>
                </div>
                <div className="col-5 pt-5 mt-3">
                    {preview && (
                    <div>
                    <img src={preview} width="100%" style={{objectFit: "cover",}} alt="preview"/>
                    </div>)}
                </div>
            </div>
        </Container>
    )
}

export default AddTopping