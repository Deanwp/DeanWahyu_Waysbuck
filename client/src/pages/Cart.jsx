import { Divider } from "@mui/material";
import React from "react"
import { useState, useEffect } from "react";
import { Card, Container, Button, Form, FloatingLabel, Col} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";

function Cart() {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState([])

    let navigate = useNavigate();
    const getOrders = async () => {
        try {
          const response = await API.get("/orders");
          // Store order data to useState variabel
          setOrders(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      
      useEffect(() => {
        getOrders();
      }, []);

      const handleChangeOrderId = (e) => {
        const id = e.target.value;
        const checked = e.target.checked;
  
        if (checked) {
          // Save topping id if checked
          setOrderId([...orderId, parseInt(id)]);
        } else {
          // Delete category id from variable if unchecked
          let newOrderId = orderId.filter((orderIdItem) => {
            return orderIdItem != id;
          });
          setOrderId(newOrderId);
        }
      };

      useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-4j-2K1PGXPS8iHdF";
      
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);

      const handleBuy = async (e) => {
        try {
          e.preventDefault();
    
          // Configuration
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          // Get data from product
          const data = {
            idOrder: orderId,
          };
          
          // Data body
          const body = JSON.stringify(data);
          console.log(data);
          // Insert Order data
          const response = await API.post("/transaction", body, config);
          console.log(response);
          const token = response.data.payment.token;

          console.log(token);
          
          window.snap.pay(token, {
            onSuccess: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate("/profile");
            },
            onPending: function (result) {
              /* You may add your own implementation here */
              console.log(result);
              navigate("/profile");
            },
            onError: function (result) {
              /* You may add your own implementation here */
              console.log(result);
            },
            onClose: function () {
              /* You may add your own implementation here */
              alert("you closed the popup without finishing the payment");
            },
          });
    
          
        } catch (error) {
          console.log(error);
        }
      };
    
    return(
        <Container className="text-danger">
            <h1 className="fw-bold mb-5 ">My Cart</h1>
            <p>Review Your Order</p>
            <div className="row text-danger gap-5">  
                <div className="col-7 text-danger ">
                    <Divider></Divider>
                    {orders.length !== 0 ? (
                        <div className="d-grid">
                            {orders.map((item, index, array) => (
                            <div key={index} className="row card-body p-0 mb-3">
                                    <div className="col-3 p-0 mb-2 mt-5 d-flex align-items-center gap-3">
                                        <input type="checkbox" value={item.id} onClick={handleChangeOrderId}/> 
                                        <img className="ml-3" src={item.beverage.image} alt="" height='120px'/>
                                    </div>
                                    <div className="d-flex p-0 col-9 mb-2 mt-5 ">
                                        <div className="col-8">
                                            <h4 className="mb-1 fw-bold">{item.beverage.title}</h4>
                                            <p className="mb-1 d-flex text-start"> <span className="fw-bold">Toping :</span> {item.toppings.map(topping =>  <p className="mx-start m-0">{topping.title},</p>)} </p>
                                        </div>
                                        <div className="col-4 mx-0 text-end " >
                                            <p className="mb-1 mx-0">33.000</p>
                                            <img src="/images/Delete.png" alt="" />
                                        </div>
                                    </div>
                            </div>))}
                        </div>
                    ) : (
                    <Col>
                      <div className="text-center pt-5">
                        <img className="img-fluid" style={{ width: "40%" }} alt="empty" />
                        <div className="mt-3">No data Topping</div>
                      </div>
                    </Col>
                  )}
                    <Divider></Divider>

                    <div className="row card-body p-0 mb-3 gap-5">
                        <div className="d-flex col-6 p-0 mb-2 mt-5">
                            <div className="col-8 p-0">
                                <Divider></Divider>
                                <p className="mb-2 fw-bold">Subtotal</p>
                                <p className="mb-2"> Qty </p>
                                <Divider></Divider>
                                <p className="mb-2 fw-bold"> Total </p>
                            </div>
                            <div className="col-4 mx-0 text-end p-0 " >
                                <Divider></Divider>
                                <p className="mb-2 mx-0">Price : Rp.33.000</p>
                                <p className="mb-2">1</p>
                                <Divider></Divider>
                                <p className="mb-2 fw-bold"> Rp.33.000 </p>
                            </div>
                        <Divider></Divider>
                        </div>
                        <div className="receipt p-2 col-5 mb-2 mt-5 text-center border-danger mr-2">
                                <img className="mb-3" src="/images/receip.png" alt="" />
                                <p>Attache of Transaction</p>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-danger">
                <Form >
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="text" placeholder="Name"  />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="number" placeholder="Phone" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form">
                            <Form.Control style={{backgroundColor:"whitesmoke"}} className="formInput" type="number" placeholder="Postcode"  />
                        </Form.Group>

                        <Form.Group className="mb-3 text-dark" controlId="form">
                        <FloatingLabel controlId="floatingTextarea2" label="Address" style={{backgroundColor:"whitesmoke"}}>
                            <Form.Control
                            
                            className="formInput"
                            as="textarea"
                            style={{ height: '200px' }}
                            />
                        </FloatingLabel>
                        </Form.Group>
                        <div className="d-grid text-center mt-5">
                        <Button variant="danger" width="100%" onClick={handleBuy}>
                            Pay
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Cart