import {React,useContext} from "react"
import { Card, Container, Col, Row, Button} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import convertRupiah from "rupiah-format";
import { UserContext } from "../context/userContext";


function DetailProduct() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [state] = useContext(UserContext);
    const [beverage, setBeverage] = useState({});
    const [topping, setTopping] = useState([])
    const [toppingId, setToppingId] = useState([])
    const [qty, setQty]= useState(1)
    const [toppingPrice, setToppingPrice] = useState([])

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
    
    const incrementQty = () => setQty(qty + 1);
    const decrementQty = () => setQty(qty - 1);

    const totalPrice = (parseInt(beverage.price) + toppingPrice.reduce((a, b) => a + b, 0)) * qty
      
        // For handle if category selected
    const handleChangeOrderId = (e) => {
      const id = e.target.id;
      const checked = e.target.checked;
      const price = e.target.value
      console.log(price);
      if (checked) {
        // Save topping id if checked
        setToppingPrice([...toppingPrice, parseInt(price)]);
      } else {
        // Delete category id from variable if unchecked
        let newToppingPrice = toppingPrice.filter((toppingPriceItem) => {
          return toppingPriceItem != price;
        });
        setToppingPrice(newToppingPrice);
      }

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
            toppingId: toppingId,
            price: parseInt(beverage.price) + toppingPrice.reduce((a, b) => a + b, 0),
            qty: qty
          };
          
          // Data body
          const body = JSON.stringify(data);
          console.log(data);
          // Insert Order data
          await API.post("/order", body, config);
    
          navigate("/cart/" + state.user.id )
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
                                <input style={{float:"left"}} id={item.id} type="checkbox" value={item.price} onClick={handleChangeOrderId}/>
                                <label class="iconTopping" for={item.id}></label>
                            </div>
                            <img src={item.image} className="m-3" alt="" width= '90px' height= '90px;'  />
                            <p className="mb-0">{item.title}</p>
                            <p>{convertRupiah.convert(item.price)}</p>
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
                    <div className="d-flex align-item-center justify-content-between fw-bold mt-5 mb-0">
                        <h2></h2>
                        <div className="d-flex bg-danger align-item-center">
                          <Button className="btn-danger p-3 fs-5 fw-bold" onClick={decrementQty}>-</Button>
                          <label className="m-3 text-white fs-5" >{qty}</label>
                          <Button className="btn-danger p-3 fs-5 fw-bold" onClick={incrementQty}>+</Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between fw-bold mt-3 mb-3">
                        <h2>Total</h2>
                        <h2>{convertRupiah.convert(totalPrice)}</h2>
                    </div>
                    <div className="addCart d-grid text-center mt-3">
                        <Button variant="danger" width="100%" onClick={handleBuy} type="submit">
                           Add to Cart 
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default DetailProduct 