import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import Signup from '../Login/SignUp';
import Product from '../Pages/Product';
import Categories from '../Pages/Categories';
import Company from '../Pages/Company';
import Navbar from '../Components/Navbar';
import ProductDetails from '../Pages/ProductDetails';
import Task from '../Pages/Task';

const AllRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Task />} />
        <Route path='/product' element={<Product />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/company' element={<Company />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;