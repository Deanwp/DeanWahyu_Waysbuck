import React, { useContext, useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import imgBlank from "../assets/blank-profile.png";
import dateFormat from "dateformat"
import { Link, useNavigate, useParams } from "react-router-dom";
import convertRupiah from "rupiah-format";



function Profile() {
    const [state] = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [transactions, setTransactions] = useState([]);
    const timestamp = new Date(transactions.createdAt)
    let { id } = useParams()

    console.log(timestamp);

    const getProfile = async () => {
        try {
          const response = await API.get("/profile");
          setProfile(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      const getTransactions = async () => {
        try {
          const response = await API.get("/transactions/"+ id);
          setTransactions(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getProfile();
        getTransactions();
      }, []);
    return(
        <Container>
            <div className="row align-items-start justify-content-center mt-5">
                <div className="row col-md-6 col-sm-12 align-items-start p-0 ">
                <h1 className="text-danger fw-bold mb-4">My Profile</h1>
                   <div className="col-md-4 col-sm-12">
                    <img src="/Images/Profilepict.png" style={{ width: "90%" }} alt="" />
                   </div>
                   <div className="col-md-8 col-sm-12 sm-text-center p-0">
                    <h4>Full Name</h4>
                    <p>{state.user.name}</p>
                    <h4>Email</h4>
                    <p>{state.user.email}</p>
                   </div>
                </div>
                <div className="row col-md-6 col-sm-12">
                <h1 className="text-brown fw-bold mb-4">My Transaction</h1>
                {transactions.length !== 0 ? (
                    <div>
                      {transactions?.map((item, index) => (
                        <div className="card mb-3">
                        <div className="row m-1 p-3">
                          <div className="d-grid col-md-4 order-2 justify-content-center align-item-center mx-auto text-center">
                              <img className="mx-auto" src="/images/Logo.png" width="100px" height="100px" alt="" />
                              <div className="status align-item-center p-0 mb-0 mx-auto"><p className="text-center mb-0 p-1">{item.status}</p></div>
                              <div className="total pt-2"><span className="fw-bold">Total : </span>{convertRupiah.convert(item.allPrice)}</div>
                          </div>
                          <div className="col-md-8 order-1">
                            {item.orders.map(order =>
                              <div className="row card-body p-0 mb-3">
                                  <div className="col-4 p-0">
                                      <img src={order.beverage.image} alt="" height='120px'/>
                                  </div>      
                                  <div className="p-0 col-8">
                                      <p className="fw-bold mx-start m-0">{order.beverage.title},</p>
                                      <h4 className="mb-1 fw-bold"></h4>
                                      <p className="mb-1"><span className="fw-bold">{dateFormat(item.createdAt,"dddd")}</span>, {dateFormat(item.createdAt,"d mmmm yyyy, HH:MM ")}</p>
                                      <div className="d-flex mb-1">
                                        <p className="col-2,5 mb-1 d-flex text-start fw-bold">Toping :</p> 
                                        <ul className="col-9 d-grid mx-start mb-0 text-start"> {order.toppings.map(topping =>  <li>{topping.title}</li>)}</ul>
                                      </div>
                                  </div>
                              </div>)}
                          </div>
                        </div>
                        </div>))}
                    </div>) : (<div className="no-data-transaction">No transaction</div>)}
                </div>
            </div>
        </Container>
    )
  }
  
  export default Profile;