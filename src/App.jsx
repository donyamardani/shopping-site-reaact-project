import React from 'react'
import  { Toaster } from 'react-hot-toast'
import { CssBaseline } from '@mui/material'
import { useSelector } from 'react-redux'
import Navbar from "./Components/Navbar"
import { Navigate, Route, Routes } from 'react-router-dom'
import  Home  from './Pages/Home'
import About from './Pages/About'
import Auth from './Pages/Auth'
import Cart from'./Pages/Cart'
import Category from './Pages/Category'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import NotFound from './Pages/NotFound'

export default function App() {
  const {token}=useSelector(state=>state.auth)
  return (
    <>
    <CssBaseline/>
    <Navbar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Routes path='/about' element={<About/>}/>
        <Routes path='/auth' element={token?<Navigate to={'/'}/>:<Auth/>}/>
        <Routes path='/cart' element={!token?<Navigate to={'/'}/>:<Cart/>}/>
        <Routes path='/category' element={<Category/>}/>
        <Routes path='/product' element={<Products/>}/>
        <Routes path='/productDetail' element={<ProductDetails/>}/>
        <Routes path='*' element={<NotFound/>}/>
            
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}
