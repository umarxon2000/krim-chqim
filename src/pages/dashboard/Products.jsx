import React, { useEffect, useState } from "react";
import MiniDrawer from "../../components/Sidebar/Sidebar";
import "../../components/Products/products.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import moment from "moment";
import { IconButton, Table, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Loader from "../../components/loader/Loader";

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

const Products = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [updateopen, setUpdateOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [newPrice, setUpdatePrice] = useState();
  const [newId, setIDItem] = useState("");
  const [ProductById, setProductById] = useState();

  const [IsLoading, setIsLoading] = useState(false);


  const [date, setDate] = useState();

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const updatehandleClose = () => setUpdateOpen();

  const updatehandleOpen = (product) => {
    setUpdateOpen(true);
    setIDItem(product.id);
    setProductById(product);
  };
  const product = {
    title,
    price,
  };

  const addproducts = () => {
    setIsLoading(true);
    axios
      .post("/products/", product)
      .then(
        (res) =>
          res.status === 201 && window.location.reload() && setIsLoading(false)
      )
      .catch((err) => console.error(err));
  };
  const updateItem = () => {
    const updateData = {
      product: newId,
      price: newPrice,
      start_date: date,
    };

    setIsLoading(true);
    axios
      .post("/prices/", updateData)
      .then((res) => res.status === 201 && setIsLoading(false) && window.location.reload())
      .catch((err) => console.error(err))
  };
  const deleteItem = (id) => {
    setIsLoading(true);
    axios
      .delete(`/products/${id}/`)
      .then(
        (res) =>
          res.status === 204 && setIsLoading(false) && window.location.reload()
      )
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("/products/?prices=true")
      .then((res) => setAllProducts(res.data) && setIsLoading(false))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <>
        <MiniDrawer />

        

        <div className="prodcts_page">
          {!allproducts.length  ? (
            <Loader />
          ) : (
            <Table hoverRow>
              <thead>
                <tr>
                  <th>№</th>
                  <th>product name</th>
                  <th>tan narxi</th>
                  <th>sotiladigan narxi</th>
                  <th>kiritilgan sana</th>
                  <th>delete</th>
                  <th>update</th>
                </tr>
              </thead>
              <tbody>
                {allproducts?.map((product, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <th>{product.title}</th>
                    <th>{product.prices[0].price}</th>
                    <th>
                      {product.prices[1]?.price
                        ? product.prices[1]?.price
                        : "sotiladigan narx kiritilmagan"}
                    </th>
                    <th>
                      {moment(product.created_date).format(
                        "DD,MMMM,YYYY | MM : SS"
                      )}
                    </th>
                    <th onClick={() => deleteItem(product.id)}>
                      <IconButton className="i" size="large">
                        <DeleteIcon
                          sx={{ color: "red" }}
                          className="i"
                          fontSize="inherit"
                        />
                      </IconButton>
                    </th>
                    <th onClick={() => updatehandleOpen(product)}>
                      <IconButton size="large">
                        <CreateIcon fontSize="inherit" />
                      </IconButton>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>

          )}
           <div className="btn_add">
          <Button sx={{ fontSize: "40px" }} onClick={handleOpen}>
            {" "}
            +{" "}
          </Button>
        </div>
          
        </div>
       

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
                  label="product title"
                  placeholder="product title"
                  onChange={(e) => setTitle(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <TextField
                  id="outlined-textarea"
                  label="product price"
                  placeholder="product price"
                  onChange={(e) => setPrice(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <Button size="large" onClick={() => addproducts()}>
                  {" "}
                  add products
                </Button>
              </div>
            </Box>
          )}
        </Modal>

        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={updateopen}
          onClose={updatehandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {IsLoading ? (
            <Loader />
          ) : (
            <Box sx={style}>
              <div className="products_box">
                <h4>MAHSULOTNI O'ZGARTIRISH</h4>
                <TextField
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="input_addproduct"
                />
                <TextField
                  id="outlined-textarea"
                  label="product price"
                  placeholder="product price"
                  onChange={(e) => setUpdatePrice(e.target.value)}
                  multiline
                  className="input_addproduct"
                />
                <TextField
                  value={ProductById?.title}
                  disabled
                  multiline
                  className="input_addproduct"
                />
                <Button size="large" onClick={() => updateItem()}>
                  {" "}
                  add products
                </Button>
              </div>
            </Box>
          )}
        </Modal>
      </>
    </div>
  );
};

export default Products;
