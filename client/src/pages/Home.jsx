import React from "react"
import { Card, Container, Col, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import ProductCard from "../component/Card/BeverageCard";

function Home() {
    const [beverage, setBeverage] = useState([]);
    console.log(beverage);
    const getBeverage = async () => {
        try {
          const response = await API.get("/beverages");
          // Store product data to useState variabel
          setBeverage(response.data.data);
        } catch (error) {
          console.log(error);
        }
    };
    useEffect(() => {
        getBeverage();
        }, []);
    

    return(
        <Container>
            <div>
                <img src="/images/bg-main.png" alt="" width="100%" />
                <div style={{marginLeft: '100px', position:'absolute', top: '15%'}}className="d-grid text-white col-md-6 col-sm-12 gap-4">
                    <h1 style={{fontSize: '60px'}} className="fw-bold text-white">WAYSBUCK</h1>
                    <p style={{fontSize:'24px'}}>Things are changing, but we’re still here for you</p>
                    <p style={{fontSize:'18px'}} className="col-md-10 col-xxl-6">We have temporarily closed our in-store cafes, but select grocery and drive-thru locations remaining open. Waysbucks Drivers is also available <br/> <br/>Let’s Order...</p>
                </div>
            </div>
            
            <div className="row align-items-start p-0 mt-5 ">
            <h1 className="text-danger fw-bold mb-4">Lets Order</h1>    
                {beverage.length !== 0 ? (
                   <Row>
                       {beverage?.map((item, index) => (<ProductCard item={item} key={index}/>))}
                   </Row>
                   ) : (
                    <Col>
                    <div className="text-center pt-5">
                      <img className="img-fluid" style={{ width: "40%" }} alt="empty" />
                      <div className="mt-3">No data Beverage</div>
                    </div>
                  </Col>
                )}
            </div>
        </Container>
    )
  }
  
  export default Home;