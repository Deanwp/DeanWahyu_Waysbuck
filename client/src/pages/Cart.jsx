import { Divider } from "@mui/material";
import React from "react"
import { useState, useEffect } from "react";
import { Card, Container, Button, Form, FloatingLabel, Col} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import DeleteData from "../component/Modal/DeleteData";

function Cart() {
    const [orders, setOrders] = useState([]);
    const [orderId, setOrderId] = useState([])
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [totalPrice, setTotalPrice] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { id } = useParams()
    let navigate = useNavigate();
    

    const getOrders = async () => {
        try {
          const response = await API.get("/orders/"+ id);
          // Store order data to useState variabel
          setOrders(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getOrders();
      }, []);


      const handleDelete = (index) => {
        setIdDelete(index);
        handleShow();
      };
      const deleteById = async (index) => {
        try {
          await API.delete(`/order/${index}`);
          getOrders();
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        if (confirmDelete) {
          handleClose();
          deleteById(idDelete);
          setConfirmDelete(null);
        }
      }, [confirmDelete]);


      const handleChangeOrderId = (e) => {
        const id = e.target.id;
        const checked = e.target.checked;
        const price = e.target.value

        if (checked) {
          // Save topping id if checked
          setTotalPrice([...totalPrice, parseInt(price)]);
        } else {
          // Delete category id from variable if unchecked
          let newTotalPrice = totalPrice.filter((totalPriceItem) => {
            return totalPriceItem != price;
          });
          setTotalPrice(newTotalPrice);
        }

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

      const allPrice = totalPrice.reduce((a, b) => a + b, 0)
      console.log(allPrice);

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
            orderId: orderId,
            allPrice: allPrice
          };
          
          // Data body
          const body = JSON.stringify(data);
          console.log(data);
          // Insert Order data
          const response = await API.post("/transaction", body, config);
        
          const token = response.data.payment.token;
          
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
      <>
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
                                        <input type="checkbox" id={item.id} value={item.price * item.qty} onClick={handleChangeOrderId}/> 
                                        <img className="ml-3" src={item.beverage.image} alt="" height='120px'/>
                                    </div>
                                    <div className="d-flex p-0 col-9 mb-2 mt-5 ">
                                        <div className="col-8">
                                            <h4 className="mb-1 fw-bold">{item.beverage.title}</h4>
                                            <div className="d-flex mb-1">
                                              <p className="col-2,5 mb-1 d-flex text-start fw-bold">Toping :</p> 
                                              <ul className="col-9 d-grid mx-start mb-0 text-start"> {item.toppings.map(topping =>  <li>{topping.title}</li>)}</ul>
                                            </div>
                                            <p className="mb-1 d-flex text-start">{convertRupiah.convert(item.price)} x {item.qty} </p>

                                        </div>
                                        <div className="col-4 mx-0 text-end " >
                                            <p className="mb-1 mx-0"></p>
                                            <div style={{cursor:'pointer'}} onClick={() => {handleDelete(item.id);}}>
                                              <img src="/images/Delete.png" alt="" />
                                            </div>
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
                        <div className="d-flex col-12 p-0 mb-2 mt-5">
                            <div className="col-8 p-0">
                                <Divider></Divider>
                                <p className="mb-2 fw-bold"> Total </p>
                            </div>
                            <div className="col-4 mx-0 text-end p-0 " >
                                <Divider></Divider>
                                <p className="mb-2 fw-bold"> {convertRupiah.convert(allPrice)} </p>
                            </div>
                        <Divider></Divider>
                        </div>
                    </div>
                </div>
                <div className="col-4 text-danger">
                <Form >
                        {/* <Form.Group className="mb-3" controlId="form">
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
                        </Form.Group> */}
                        <div className="d-grid text-center">
                        <Button disabled={!orderId[0]} variant="danger" width="100%" onClick={handleBuy}>
                            Pay
                        </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </Container>
        <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
        </>
    )
}

export default Cart