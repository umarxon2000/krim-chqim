import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";



export default function DataTable() {
  const [allproducts, setAllProducts] = useState([]);
  const [allOrder, setAllOrder] = useState();

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/orders/")
      .then((res) => setAllOrder(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 50 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{textAlign: "center"}}>
            <TableCell>№</TableCell>
            <TableCell align="center">title</TableCell>
            <TableCell align="center">soni</TableCell>
            <TableCell align="center">narxi</TableCell>
            <TableCell align="center">izoh</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {allOrder && allOrder.length > 0 && allproducts && allproducts.length > 0 && allOrder.map((row) => (
    <TableRow
      key={row.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row.id}
      </TableCell>
      <TableCell align="center">
        {allproducts.find((product) => product.id == row.product)?.title || ""}
      </TableCell>
      <TableCell align="center">{row.amount}</TableCell>
      <TableCell align="center">{row.price}</TableCell>
      <TableCell align="center">{row.comment}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
  );
}
