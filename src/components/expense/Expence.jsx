import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./expense.css";
import DataTable from "../table/Table";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  text: "center",
};



const Expence = () => {
    const [allExpenses, setAllExpense] = useState([])
    const [open, setOpen] = useState(false);
    const [name, setName ] = useState();
    const [comment, setComment] = useState();
    const [price, setPrice] = useState();
   
  
   
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const addOrder = () => {
      const expense = {
        name,
        price,
        comment,
      };
  
      axios
        .post("/expenses/", expense)
        .then((res) => res.status === 201 && window.location.reload())
        .catch((err) => console.error(err));
    };
  
    useEffect(() => {
      axios
        .get("/expenses/")
        .then((res) => setAllExpense(res.data))
        .catch((err) => console.error(err));
     
    }, []);
  return (
    <>
      <div className="table_box">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center">№</TableCell>
                <TableCell align="center">ismi</TableCell>
                <TableCell align="center">izoh</TableCell>
                <TableCell align="center">chiqim summasi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allExpenses?.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"  component="th" scope="row">{row.comment}</TableCell>
                  <TableCell align="center"  component="th" scope="row">{row.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button sx={{fontSize: "40px"}} onClick={handleOpen}>+</Button>
      </div>
      <div className="order_form">
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="products_box">
              <h4>Chiqim (ya'ni расходларни) qo'shish </h4>
              <TextField
                id="outlined-textarea"
                label="ismingizni kiriting"
                placeholder="ismingizni kiriting"
                onChange={(e) => setName(e.target.value)}
                multiline
                className="input_addproduct"
              />
              <TextField
                id="outlined-textarea"
                label="izoh yozing"
                placeholder="izoh yozing"
                onChange={(e) => setComment(e.target.value)}
                multiline
                className="input_addproduct"
              />
              <TextField
                id="outlined-textarea"
                label="qancha rasxod ketdi"
                placeholder="ketgan rasxodni kiriting"
                onChange={(e) => setPrice(e.target.value)}
                multiline
                className="input_addproduct"
              />
             

            

              <Button size="large" onClick={() => addOrder()}>
                {" "}
                qo'shish
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Expence;
