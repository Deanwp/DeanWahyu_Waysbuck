import React from "react"
import { Card, Container, Col, Row, Button} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";


function DetailProduct() {
    let navigate = useNavigate();
    let { id } = useParams();

    const [beverage, setBeverage] = useState({});
    const [topping, setTopping] = useState([])
    const [toppingId, setToppingId] = useState([])
    console.log(toppingId);
    const [toppingPrice, setToppingPrice] = useState([])
  
    console.log(beverage);

    const getBeverage = async (id) => {
        try {
          const response = await API.get("/beverage/" + id);
          // Store data to useState variabel
          setBeverage(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    const getTopping = async () => {
        try {
          const response = await API.get("/toppings");
          // Store data to useState variabel
          setTopping(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    

    
      
        // For handle if category selected
    const handleChangeOrderId = (e) => {
      const id = e.target.value;
      const checked = e.target.checked;

      if (checked) {
        // Save topping id if checked
        setToppingId([...toppingId, parseInt(id)]);
      } else {
        // Delete category id from variable if unchecked
        let newToppingId = toppingId.filter((toppingIdItem) => {
          return toppingIdItem != id;
        });
        setToppingId(newToppingId);
      }
    };

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
            idBeverage: beverage.id,
            toppingId: toppingId
          };
          
          // Data body
          const body = JSON.stringify(data);
          console.log(data);
          // Insert Order data
          await API.post("/order", body, config);
    
          navigate("/cart")
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
          getBeverage(id);
          getTopping()
        }, []);

    return(
        <Container>
            <div className="row">
                <div className="col-4 pt-5 mt-3">
                    <img src={beverage.image} alt={beverage.image} width="100%" />
                </div>
                <div className="col-8 pt-5 mt-3 text-danger">
                    <h1 className="fw-bold mb-3">{beverage.title}</h1>
                    <p className="fs-5 mb-5">{convertRupiah.convert(beverage.price)}</p>
                    {topping.length !== 0 ? (
                    <div className="row text-center mt-5">
                    {topping?.map((item, index) => (
                        <div className="col-3 d-grid text-center justify-content-center" >
                            <div className="d-flex justify-content-end" id="checkboxes">
                                <input style={{float:"left"}} id={item.id} type="checkbox" value={item.id} onClick={handleChangeOrderId}/>
                                <label class="iconTopping" for={item.id}></label>
                            </div>
                            <img src={item.image} className="m-3" alt="" width= '90px' height= '90px;'  />
                            <p>{item.title}</p>
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
                    <div className="d-flex justify-content-between fw-bold mt-5 mb-5">
                        <h2>Total</h2>
                        <h2>{ beverage.price }</h2>
                    </div>
                    <Link to="/cart"><div className="addCart d-grid text-center mt-5">
                        <Button variant="danger" width="100%" onClick={handleBuy} type="submit">
                           Add to Cart 
                        </Button>
                    </div></Link> 
                </div>
            </div>
        </Container>
    )
}

export default DetailProduct 