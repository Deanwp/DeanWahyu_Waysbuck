import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Card, Container, Col, Row} from "react-bootstrap";
import convertRupiah from "rupiah-format";
import { MenuItem, Tooltip, IconButton, Menu } from '@mui/material';
import { API } from "../../config/api";

export default function ProductCard({ item, key, }) {
  const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const addFavorite = async () => {
      try {
        const config = {
          headers : {
            "content-type" : "application/json",
          }
        }
        const data = {
          idBeverage: item.id
        }
        const body = JSON.stringify(data);
        await API.post("/favorite", body, config);
        alert("add to favorites") 
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className=" col-md-3 col-sm-12">
      <Tooltip title="add favorite" style={{position:'absolute', zIndex:99, margin:0}}>
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <img src="/Images/dropdown.svg" width="20" height="20" alt="Profile"/>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
                        <MenuItem onClick={addFavorite} className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/heart-regular.svg" width="20" height="20" alt="logout" /></i> Add Favorite</MenuItem>
                    </Menu>
    <Link to={"/beverage/" + item.id} style={{ textDecoration: "none" }}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text> {convertRupiah.convert(item.price)} </Card.Text>
            </Card.Body>
        </Card>
    </Link>
    </div>
  );
}
