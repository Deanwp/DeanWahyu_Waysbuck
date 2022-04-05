import React from 'react';
import {AdminPage, Home, Profile, AddProduct, AddTopping, DetailProduct, Cart, Favorite} from '../pages'
import '../style/style.css'

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from '../component/Header';

const RoutesComponenet = () => {
    
    return(
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/addproduct" element={<AddProduct />} />
                <Route exact path="/beverage/:id" element={<DetailProduct />} />
                <Route exact path="/cart/:id" element={<Cart />} />
                <Route exact path="/addtopping" element={<AddTopping />} />
                <Route exact path="/profile/:id" element={<Profile />} /> 
                <Route exact path="/adminpage" element={<AdminPage />} />
                <Route exact path="/favorite/:id" element={<Favorite />} />
            </Routes>
        </>
    )
}

export default RoutesComponenet