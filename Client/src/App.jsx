import React from 'react'
import { CssBaseline } from '@mui/material'
import Navbar from './Components/Navbar'
import { Route, Routes,Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import { useSelector } from 'react-redux'
import Auth from './Pages/Auth'
import Cart from './Pages/Cart'
import Category from './Pages/Category'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductDetails'
import NotFound from './Pages/NotFound'
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'
import {Box} from '@mui/material'
export default function App() {
    const {token}=useSelector(state=>state.auth)
  return (
  <>
  <CssBaseline/>
  <Navbar/>
   <Box minHeight={'90vh'}>
  <Routes>
    <Route exact path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/auth' element={token?<Navigate to={'/'}/>:<Auth/>}/>
    <Route path='/cart' element={!token?<Navigate to={'/auth'}/>:<Cart/>}/>
    <Route path='/category' element={<Category/>}/>
    <Route path='/products' element={<Products/>}/>
    <Route path='/product-details/:id/:name' element={<ProductDetails/>}/>
    <Route path='*' element={<NotFound/>}/>
  </Routes>
   </Box>
  <Footer/>
  <Toaster/>
  </>
  )
}
