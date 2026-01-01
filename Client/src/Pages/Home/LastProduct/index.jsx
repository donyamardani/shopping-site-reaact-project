import React, { useEffect, useState } from "react";
import notify from "../../../Utils/notify";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import {Link} from 'react-router-dom'
export default function LastProduct() {
  const [slider,setSlider]=useState()
  useEffect(
    ()=>{
      (
        async()=>{
          try {
            const res=await fetch(import.meta.env.VITE_BASE_API+'product?sort=-createAt&limit=7')
            const data=await res.json()
            setSlider(data.data)
          } catch (error) {
            notify('error','this conection is faild')
          }
        }
      )()
    },[]
  );
  const item = slider?.map((e, index) => (
    <SwiperSlide key={index}>
    <Box sx={{boxShadow:'0 0 5px 2px rgba(0,0,0,.2)',width:'100%',height:'100%',backgroundColor:'white',borderRadius:'20px',overflow:'hidden'}}>
    <img src={import.meta.env.VITE_BASE_URL + e.images[0]} alt={e.name} />
    <Typography px={'10px'} variant="h3"  component={'h2'}>{e.name}</Typography>
    <Typography px={'10px'} variant="body2">{e.description.split(' ').slice(0,10).join(' ')}</Typography>
    <Button  variant="contained" sx={{float:'right',marginRight:'20px',marginTop:'20px'}}><Link style={{color:'white',fontSize:'12px'}} to={`/product-details/${e._id}/${e.name.replaceAll(' ','-')}`}>more information</Link></Button>
    </Box>
    </SwiperSlide>
  ));
  return (
    <Box sx={{borderRadius:'30px',overflow:'hidden',width:'90%',backgroundColor:'gainsboro',padding:'20px',margin:'50px auto'}}>
      <Typography align="center" variant="h3" mb={'30px'}>Last Products</Typography>

    <Box mt={'20px'} sx={{ width: "100%", height: "60vh" }}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="lastProduct"
      >
        {item}
      </Swiper>
    </Box>
    </Box>
  );
}
