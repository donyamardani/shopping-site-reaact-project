import { Box, Button, TableFooter, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {add,remove,clear} from './../../Store/Slices/CartSlice';
export default function Cart() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch=useDispatch()
  const cartItems = items?.map((e, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="center">{index+1}</TableCell>
        <TableCell align="center">{e.name}</TableCell>
        <TableCell align="center">
  
          <img
            style={{ width: "80px", height: "80px" }}
            src={import.meta.env.VITE_BASE_URL + e.images[0]}
            alt=""
          />
        </TableCell>
        <TableCell align="center">${e.price}</TableCell>
        <TableCell align="center">{e.cartQuantity}</TableCell>
        <TableCell align="center">${e.price * e.cartQuantity}</TableCell>
        <TableCell align="center">
          <Button variant="contained" color="error" onClick={() => dispatch(remove(e._id))} >
            -
          </Button>
          <Button  variant="contained"  color="success" onClick={() => dispatch(add(e))}
          >
            +
          </Button>
        </TableCell>
      </TableRow>
    );
  });
  return (
    <>
      {items.length > 0 ? (
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ width: "90%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">image</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Add/Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{cartItems}</TableBody>
              <TableFooter>
              <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">${totalPrice}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(clear())}
          >
            Clear Cart
          </Button>
        </Box>
      ) : (
        <Typography variant="h2">No Items In Cart</Typography>
      )}
    </>
  );
}
