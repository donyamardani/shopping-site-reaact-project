import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({image,title,id}) {

  return (
    <Box sx={{
        width:'300px',
        height:'300px',
        position:'relative',
        boxShadow:'0 0 10px 2px rgba(0,0,0,.2)',
        borderRadius:'20px',
        overflow:'hidden',
        '& > img':{
            width:'100%',
            height:'100%',
            transition:'all .5s ease'
        },
        '& > a':{
            transition:'all .5s ease',
            color:'white',
            position:'absolute',
            fontSize:'32px',
            textShadow:'0 0 10px rgba(0,0,0,.5)',
            top:'50%',
            left:'50%',
            transform:'translate(-50%,-50%)',
            opacity:0,
            visibility:'hidden'
        },
        '&:hover img':{
            filter:'blur(3px) grayscale(80%)'
        },
        '&:hover a':{
            opacity:1,
            visibility:'visible'
        }
    }}>
      <img src={import.meta.env.VITE_BASE_URL+image[0]} alt="" />
      <Link to={`/products/${id}/${title.replaceAll(' ','-')}`}>{title}</Link>
    </Box>
  )
}
