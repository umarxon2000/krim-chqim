import React, { useEffect, useState } from "react";
import MiniDrawer from "../../components/Sidebar/Sidebar";
import "../../components/Products/products.css";
import axios from "../../../api/axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  text: "center",
};

const Products = () => {
 

  const [allproducts, setAllProducts] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  console.log(allproducts);

  const product = {
    title,
    price,
  };

  const addproducts = () => {
    axios
      .post("/products/", product)
      .then((res) => res.status === 201 && window.location.reload())
      .catch((err) => console.error(err));
  };

  const deleteItem = (id) => {

    console.log(id);

    axios.delete(`/products/`, id)
    .then((res) => res.status === 204 && window.location.reload())
    .catch((err) => console.error(err));

  }

  useEffect( () => {
    axios.get("/products/?prices=true")
        .then(res => setAllProducts(res.data))
        .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <MiniDrawer />

      <div className="btn_add">
        <Button onClick={handleOpen}>+</Button>
      </div>

      <div className="prodcts_page">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>product name</th>
              <th>product price</th>
              <th>kiritilgan sana</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {
                allproducts?.map((product, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{product.title}</th>
                        {product.prices.map((item, index) => (
                           <th key={index}> {item.price} </th>
                           
                        ))}
                        <th>{moment(product.created_date).format('DD MMM, YYYY | MM : SS')}</th>
                        <th onClick={() => deleteItem(product.id)}>delete</th>
                    </tr>

                ))
            }
            
          </tbody>
        </table>

      
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="products_box">
                    <h4>MAHSULOT QO'SHISH</h4>

                <input type="text" className="input_addproduct" onChange={(e) => setTitle(e.target.value)} placeholder="product title" />
                <input type="text" className="input_addproduct" onChange={(e) => setPrice(e.target.value)} placeholder="product price" />
              <Button onClick={() => addproducts()}> add products</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Products;
