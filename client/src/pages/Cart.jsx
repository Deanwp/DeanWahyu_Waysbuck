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
    const [shippings, setShippings] = useState([])
    const [shippingId, setShippingId] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { id } = useParams()
    let navigate = useNavigate();
    
    console.log(orders);
    console.log(shippings);


    const getShippings = async () => {
      try {
        const response = await API.get("/shipping/"+ id);
        setShippings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getOrders = async () => {
        try {
          const response = await API.get("/orders/"+ id);
          setOrders(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        getOrders();
        getShippings()
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

      const handleChangeShippingId = (e) => {
        setShippingId(e.currentTarget.value)
      };

      const handleChangeOrderId = (e) => {
        const id = e.target.id;
        const checked = e.target.checked;
        const price = e.target.value

        if (checked) {
          setTotalPrice([...totalPrice, parseInt(price)]);
        } else {
          let newTotalPrice = totalPrice.filter((totalPriceItem) => {
            return totalPriceItem != price;
          });
          setTotalPrice(newTotalPrice);
        }

        if (checked) {
          setOrderId([...orderId, parseInt(id)]);
        } else {
          let newOrderId = orderId.filter((orderIdItem) => {
            return orderIdItem != id;
          });
          setOrderId(newOrderId);
        }
      };
      

      const allPrice = totalPrice.reduce((a, b) => a + b, 0)

      useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = "SB-Mid-client-4j-2K1PGXPS8iHdF";
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);

      const handleBuy = async (e) => {
        try {
          e.preventDefault();
    
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
    
          const data = {
            orderId: orderId,
            allPrice: allPrice,
            idShipping: shippingId
          };
          
          const body = JSON.stringify(data);
          console.log(data);
          const response = await API.post("/transaction", body, config);
        
          const token = response.data.payment.token;
          
          window.snap.pay(token, {
            onSuccess: function (result) {
              console.log(result);
              navigate("/profile");
            },
            onPending: function (result) {
              console.log(result);
              navigate("/profile");
            },
            onError: function (result) {
              console.log(result);
            },
            onClose: function () {
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
                        <div className="mt-3">No data Orders</div>
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
                  {shippings.length !== 0 ? (
                        <div className="d-grid">
                          <h3 className="m-0 ">Delivery Details:</h3>
                            {shippings.map((item, index, array) => (
                              <div key={index} className="row card-body p-0 mb-3">
                                <div className="col-2 p-0 mb-2 mt-2 d-flex justify-content-center align-items-center gap-3">
                                    <Form.Check type="radio" checked={shippingId == item.id} id={item.id} key={item.id} value={item.id} onChange={handleChangeShippingId}/> 
                                </div>
                                <div className="col-10 p-0 mb-4 mt-2 d-grid align-items-center gap-2">
                                    <h5 className="m-0 p-0">Name: {item.name}</h5>
                                    <p className="m-0 p-0">Phone: {item.phone}</p>
                                    <p className="m-0">postCode: {item.postCode}</p>
                                    <p className="m-0">address: {item.address}</p>
                                </div>
                              </div>))}
                        </div>
                    ) : (
                    <Col>
                      <div className="text-center pt-5 mb-5">
                        <img className="img-fluid" style={{ width: "40%" }} alt="empty" />
                        <div className="mt-3">Add Delivery Address First</div>
                      </div>
                    </Col>
                  )}
                  <div className="d-grid text-center">
                    <Button variant="danger" width="100%">
                      <Link to="/addAddress" className="text-decoration-none text-white">
                        Add Address
                      </Link>
                    </Button>
                 </div>
                </Form>
                    <div className="d-grid text-center mt-5">
                      <Button disabled={!orderId[0] || !shippingId[0]} variant="danger" width="100%" onClick={handleBuy}>
                          Pay
                      </Button>
                      </div>
                </div>
            </div>
        </Container>
        <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
        </>
    )
}

export default Cart