import React, { useEffect, useState } from "react";
import MiniDrawer from "../../components/Sidebar/Sidebar";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Dashboard = () => {

  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };












  const [allproducts, setAllProducts] = useState([]);
  const [allOrder, setAllOrder] = useState();
  const [allExpenses, setAllExpense] = useState([])
  console.log(allExpenses, allOrder, allproducts);

  useEffect(() => {
    axios
      .get("/products/?prices=true")
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/orders/")
      .then((res) => setAllOrder(res.data))
      .catch((err) => console.error(err));
    axios
      .get("/expenses/")
      .then((res) => setAllExpense(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <MiniDrawer />


      <div className="dashboard_box"  >
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
         
            <Grid  item>
              <Paper
                sx={{
                  height: 240,
                  width: 400,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <h1>{`omborda ${allproducts?.length} xil tovar bor`}</h1> 
              </Paper>
             
            </Grid>
            <Grid  item>
              <Paper
                sx={{
                  height: 240,
                  width: 400,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <h1>{` ${allOrder?.length} ta buyurtma qabul qilingan`}</h1> 
              </Paper>
             
            </Grid>
            <Grid  item>
              <Paper
                sx={{
                  height: 240,
                  width: 400,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <h1>{`omborda ${allproducts?.length} xil tovar bor`}</h1> 
              </Paper>
             
            </Grid>
          
        </Grid>
      </Grid>
      
    </Grid>
          
      </div>
    </div>
  );
};

export default Dashboard;
