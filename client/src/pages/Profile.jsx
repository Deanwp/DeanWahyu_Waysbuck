import React, { useContext, useState, useEffect } from "react"
import { Container } from "react-bootstrap";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import imgBlank from "../assets/blank-profile.png";

function Profile() {
    const [state] = useContext(UserContext);
    const [profile, setProfile] = useState({});
    const [transactions, setTransactions] = useState([]);

    const getProfile = async () => {
        try {
          const response = await API.get("/profile");
          // Store product data to useState variabel
          setProfile(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      // Fetching transaction data from database
      const getTransactions = async () => {
        try {
          const response = await API.get("/transactions");
          // Store transaction data to useState variabel
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
                    <img src={profile?.image ? profile.image : imgBlank} style={{ width: "90%" }} alt="" />
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
                    <div className="card mb-3">
                        <div className="row m-1 p-3">
                        <div className="d-grid col-md-4 order-2 justify-content-center mx-auto text-center">
                            <img className="mx-auto" src="/images/Logo.png" width="100px" height="100px" alt="" />
                            <img className="mx-auto m-4" src="/images/Barcode.png" width="100px" height="100px" alt="" />
                            <div className="status btn p-0 align-item-center">Waiting Confirmation</div>
                            <div className="total pt-2">Sub Total: </div>
                        </div>
                        {transactions.length !== 0 ? (
                        <div className="col-md-8 order-1">
                            {transactions?.map((item, index) => (
                            <div className="row card-body p-0 mb-3">
                                <div className="col-4 p-0">
                                    <img src="/images/productpict.png" alt="" height='120px'/>
                                </div>
                                <div className="p-0 col-8">
                                    <h4 className="mb-1 fw-bold">{item.orders.idBeverage}</h4>
                                    <p className="mb-1"><span className="fw-bold">Saturday</span>, 5 March 2020</p>
                                    <p className="mb-1"> <span className="fw-bold">Toping :</span>  : Bill Berry Boba, Bubble Tea Gelatin </p>
                                    <p className="mb-1">Price : Rp.33.000</p>
                                </div>
                            </div>))}
                        </div>) : (<div className="no-data-transaction">No transaction</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
  }
  
  export default Profile;