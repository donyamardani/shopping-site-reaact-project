import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {add,remove} from './../../Store/Slices/CartSlice'
import notify from './../../Utils/Notify';
import { Box, Stack, Typography,Skeleton,Button } from '@mui/material';

export default function ProductDetails() {
  const [product,setProduct]=useState()
  const {id}=useParams()
  const cartQuantity=useSelector(state=>state.cart.items).filter(e=>e._id==id)[0]?.cartQuantity;
  const dispatch=useDispatch()
  useEffect(
    ()=>{
      (
        async()=>{
          try {
            const res=await fetch(import.meta.env.VITE_BASE_API+`product/${id}`)
            const data=await res.json()
            setProduct(data.data)
          } catch (error) {
            notify('error','this conection is faild')
          }
        }
      )()
    },[id]
  )
  return (
    <>
    {product?
    <Stack
     flexDirection={'row'} 
     flexWrap={'wrap'}
     sx={{
       boxShadow: "0 0 10px 2px rgba(0,0,0,.2)",
       borderRadius: "20px",
       overflow: "hidden",
       width: { xs: "98%", md: "80%" },
       height: "80vh",
       gap: "15px",
       margin:'50px auto'
          }}
    >
          <Box sx={{ width: {xs:'100%',md:'40%'},height:{xs:'40%',md:'100%'} }}>
            <img
            style={{width:'100%',height:'100%'}}
              src={import.meta.env.VITE_BASE_URL + product.images[0]}
              alt=""
            />
          </Box>
       <Stack alignContent={'center'} p={'10px'} justifyContent={'space-between'} gap={'10px'} sx={{ width: {xs:'100%',md:'55%'},height:{xs:'59%',md:'100%'} }}>
        <Box>
         <Typography align='center' variant='h2'>{product?.name}</Typography>  
         <Typography mt={'20px'} sx={{textAlign:"justify"}} variant='body1'>{product?.description}</Typography>  
         <Typography variant='body2'>Quantity: {product?.cartQuantity}</Typography>  
         <Typography mt={'20px'} variant='body1'>Price: ${product?.price}</Typography>  
        </Box>
        <Box mb={'30px'} textAlign={'center'}>
          {cartQuantity?
          <>
            <Button onClick={()=>{dispatch(remove(id))}} variant='contained' color='error'>-</Button>
            <Typography mx={'30px'} component={'span'}>{cartQuantity}</Typography>
            <Button onClick={()=>{dispatch(add(product))}} variant='contained' color='success'>+</Button>
          </>
          :
          <Button variant="contained" color="primary" onClick={()=>{dispatch(add(product))}}>
               Add To Cart
          </Button>
         
          }
        </Box>
      
       </Stack>

    </Stack>
    :
        <Stack
        sx={{
          boxShadow: "0 0 10px 2px rgba(0,0,0,.2)",
          borderRadius: "20px",
          overflow: "hidden",
          width: { xs: "98%", md: "80%" },
          height: "80vh",
          gap: "15px",
          margin: '50px auto',
        }}
        flexDirection={"row"}
      >
        <Skeleton variant="rectangular" sx={{ width: { xs: '100%', md: '40%' }, height: { xs: '40%', md: '100%' } }} />
        <Stack
          alignContent={'center'}
          p={'10px'}
          justifyContent={'space-between'}
          gap={'10px'}
          sx={{ width: { xs: '100%', md: '55%' }, height: { xs: '59%', md: '100%' } }}
        >
          <Box>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="text" height={20} width="60%" />
            <Skeleton variant="text" height={20} width="40%" />
            <Skeleton variant="text" height={20} width="30%" />
          </Box>
          <Box mb={'30px'} textAlign={'center'}>
            <Skeleton variant="rectangular" width={150} height={40} />
          </Box>
        </Stack>
      </Stack>
    }
    </>
  )
}
