import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import "./order.css";
import DataTable from "../table/Table";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import moment from "moment";

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

const styleSelect = {
  width: "100%",
};

const OrderForm = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [price_status, setAge] = useState("PER");
  const [comment, setComment] = useState();
  const [amount, setAmount] = useState();
  const [id, setProduct] = useState();
  const [price, setPrice] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addOrder = () => {
    const product = {
      comment,
      price,
      price_status,
      amount,
      product: id,
    };
    setIsLoading(true);
    axios
      .post("/orders/", product)
      .then(
        (res) =>
          res.status === 201 && setIsLoading(false) && window.location.reload()
      )
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("/products/")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="table_box">
        <DataTable />
        <Button sx={{ fontSize: "40px" }} onClick={handleOpen}>
          +
        </Button>
      </div>
      <div className="order_form">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {IsLoading ? (
            <Loader />
          ) : (
            <Box sx={style}>
              <div className="products_box">
                <h4>MAHSULOT QO'SHISH</h4>
                <TextField
                  id="outlined-textarea"
                  label="mahsulot soni"
                  placeholder="mahsulot soni"
                  onChange={(e) => setAmount(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <TextField
                  id="outlined-textarea"
                  label="maxsulot narxi"
                  placeholder="mahsulot narxi"
                  onChange={(e) => setPrice(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <TextField
                  id="outlined-textarea"
                  label="buyurtmaga  izoh"
                  placeholder="buyurtmaga  izoh"
                  onChange={(e) => setComment(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <Select
                  sx={styleSelect}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={price_status}
                  onChange={handleChange}
                >
                  <MenuItem value={"PER"}>donasi</MenuItem>
                  <MenuItem value={"GENERAL"}>Umumiy</MenuItem>
                </Select>

                <Select
                  sx={styleSelect}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={id}
                  onChange={handleChangeProduct}
                >
                  {allproducts?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>

                <Button size="large" onClick={() => addOrder()}>
                  {" "}
                  add products
                </Button>
              </div>
            </Box>
          )}
        </Modal>
      </div>
    </>
  );
};

export default OrderForm;
