import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.jsx";
import { getAllUsers } from "../../actions/userAction.jsx";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader.jsx";



const Dashboard = ({ alert }) => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { loading, orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);


  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      alert("Please login first", "error")
      navigate('/login');
    }
  }, [navigate])
  useEffect(() => {
    if (token) {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
    }
  }, [dispatch]);

  let calculatedAmount = 0;
  orders && orders?.forEach((item) => {
    calculatedAmount += item.totalPrice;
  });
  let totalAmount = calculatedAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


  return (
    loading ? (<Loader />) : (

      <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{(products && products?.length) ?? 0}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{(orders && orders?.length) ?? 0}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{(users && users?.length) ?? 0}</p>
              </Link>
            </div>
          </div>
        </div>
      </div >
    )
  );
};

export default Dashboard;
