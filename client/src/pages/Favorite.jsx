import React from "react"
import { Card, Container, Col, Row} from "react-bootstrap";
import { useState, useEffect,useContext } from "react";
import { API } from "../config/api";
import BeverageCardFavorite from "../component/Card/BeverageCardFavorite";
import { UserContext } from "../context/userContext";
import { Link, useNavigate, useParams } from "react-router-dom";


function Favorite() {
    const [state] = useContext(UserContext);
    const [favorite, setFavorite] = useState([]);
    let { id } = useParams()
    const getFavorite = async () => {
      try {
        const res = await API.get("/favorites/" + id)
        setFavorite(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      getFavorite();
    }, [])

    return(
        <Container>
            <div className="row align-items-start p-0 mt-5 ">
            <h1 className="text-danger fw-bold mb-4">Favorite</h1>    
                {favorite.length !== 0 ? (
                   <Row>
                       {favorite?.map((item, index) => (<BeverageCardFavorite item={item} key={index} />))}
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
  
  export default Favorite;