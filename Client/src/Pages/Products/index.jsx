import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductsCard from "./ProductsCard";

function valuetext(value) {
  return `$${value}`;
}
export default function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState();
  const [price, setPrice] = useState([0, 1000]);
  const [sort, setSort] = useState("-createdAt");

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const handlePrice= (event, newValue) => {
    setPrice(newValue);
  };
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          import.meta.env.VITE_BASE_API +
            `product?filters[price][$gte]=${price[0]}&filters[price][$lte]=${
              price[1]
            }${id == "all" ? "" : `&filters[categoryId][$eq]=${id}`}&sort=${sort}`
        );
        const data = await res.json();
        setProducts(data.data);
      } catch (error) {
        notify("error", "connect to api failed");
      }
    })();
  }, [price,sort,id]);
  const items=products?.map((e,index)=><ProductsCard key={index} description={e.description} img={e.images} id={e._id} name={e.name} price={e.price} />)
  return (
    <>
      <Stack flexDirection={"row"} justifyContent={"space-between"} p={"20px"}>
        <Box sx={{ width: 300, mt: "50px" }}>
          <Typography>Price:</Typography>
          <Slider
            getAriaLabel={() => "Price range"}
            value={price}
            step={20}
            onChange={handlePrice}
            min={0}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={1000}
          />
        </Box>
        <Box sx={{ width: 300, mt: "50px" }}>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <InputLabel id="sort">Sort By</InputLabel>
            <Select
              id="sort"
              value={sort}
              onChange={handleSort}
              autoWidth
              label="Sort"
            >
              <MenuItem value={"-createdAt"}>Newest Product</MenuItem>
              <MenuItem value={"-price"}>Price High to Low</MenuItem>
              <MenuItem value={"price"}>Price Low to High</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Stack mt={'20px'} flexDirection={"row"} gap={'20px'} flexWrap={'wrap'} justifyContent={"center"} p={"20px"}>
      {items}
      </Stack>
    </>
  );
}
