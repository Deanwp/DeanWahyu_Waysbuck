import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Col, Row} from "react-bootstrap";
import convertRupiah from "rupiah-format";

export default function BeverageCardFavorite({ item }) {
  return (
    <div className=" col-md-3 col-sm-12">
    <Link to={"/beverage/" + item.beverage.id} style={{ textDecoration: "none" }}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.beverage.image} />
            <Card.Body>
                <Card.Title>{item.beverage.title}</Card.Title>
                <Card.Text> {convertRupiah.convert(item.beverage.price)} </Card.Text>
            </Card.Body>
        </Card>
    </Link>
    </div>
  );
}
