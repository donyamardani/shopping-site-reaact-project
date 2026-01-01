import React, { useEffect, useState } from "react";
import notify from "../../../Utils/notify";


import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box } from "@mui/material";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
export default function Banner() {
  const [sliders, setSliders] = useState();
  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(import.meta.env.VITE_BASE_API + "slider");
        const data = await res.json();
        setSliders(data.data);
      } catch (error) {
        notify("error", "something went wrong");
      }
    })();
  }, []);
  const items = sliders?.map((e, index) => (
    <SwiperSlide key={index}>
      <img src={import.meta.env.VITE_BASE_URL + e.image} alt={e.title} />
    </SwiperSlide>
  ));
  return (
    <Box sx={{ width: "100%", height: "80vh" }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation,Autoplay ]}
        className="banner"
      >
        {items}
      </Swiper>
    </Box>
  );
}

