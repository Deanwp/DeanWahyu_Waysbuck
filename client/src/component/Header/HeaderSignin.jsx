import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import { MenuItem, Tooltip, IconButton, Menu } from '@mui/material';
import { Link,useNavigate } from "react-router-dom";
import {useContext} from 'react';
import {UserContext} from '../../context/userContext'
import { useState } from 'react';



export default function HeaderSignin () {
    let navigate = useNavigate()
    const [state, dispatch] = useContext(UserContext)
    console.log(state);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const logout = () => {
        console.log(state);
        dispatch({
          type: "LOGOUT",
        });
        navigate("/");
      };
    const navbarAdmin = () => {
        if (state.user.role === "admin"){
        return <Nav className="navbar gap-3 justify-content-start align-item-center"> 
                <Container className="gap-3">
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <img src="/Images/Profile.png" width="60" height="60" alt="Profile"/>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
                        <MenuItem className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/iprofile.png" width="20" height="20" alt="adminPage" /></i><Link to="/adminpage" className="text-decoration-none text-dark"> Admin Page</Link></MenuItem>
                        <MenuItem className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/ibeverage.png" width="20" height="20" alt="addBeverage" /></i><Link to="/addproduct" className="text-decoration-none text-dark"> Add Beverage</Link></MenuItem>
                        <MenuItem className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/itopping.png" width="20" height="20" alt="addTopping" /></i><Link to="/addtopping" className="text-decoration-none text-dark"> Add Topping</Link></MenuItem>
                        
                        <MenuItem divider />
                        <MenuItem onClick={logout} className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/ilogout.png" width="20" height="20" alt="logout"/></i> Logout</MenuItem>
                    </Menu>
                </Container>
            </Nav>} else {
                return <Nav className="navbar gap-3 justify-content-start align-item-center"> 
                <Container className="gap-3">
                <Link to="/cart"><i className=""><img src="/Images/Cart.png" width="35" height="33" alt="cart"/></i></Link>
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}>
                            <img src="/Images/Profile.png" width="60" height="60" alt="Profile"/>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose}>
                        <MenuItem className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/iprofile.png" width="20" height="20" alt="logout" /></i><Link to="/profile" className="text-decoration-none text-dark"> Profile</Link></MenuItem>
                        <MenuItem className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/heart-regular.svg" width="20" height="20" alt="addTopping" /></i><Link to="/favorite" className="text-decoration-none text-dark"> Favorite</Link></MenuItem>
                        <MenuItem divider />
                        <MenuItem onClick={logout} className="gap-2 fs-6 fw-bold" eventKey='3'><i><img src="/Images/ilogout.png" width="20" height="20" alt="logout"/></i> Logout</MenuItem>
                    </Menu>
                </Container>
            </Nav>
            }
    }
    
        return(
            <Navbar bg= 'white' expand= 'xxl'>
            <Container xl>
                <Navbar.Brand href="#home">
                <Link to="/"><img
                    src="/Images/Logo.png"
                    width="75"
                    height="75"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"/>
                </Link>
                </Navbar.Brand>
                {navbarAdmin()}
            </Container>
            </Navbar>
        )
    }