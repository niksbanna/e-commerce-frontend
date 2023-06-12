import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import LoginSignup from "./component/User/LoginSignup";
import Profile from "./component/User/Profile.jsx"
import Shipping from "./component/Cart/Shipping.jsx"
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx"
import OrderSuccess from "./component/Cart/OrderSuccess";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import Contact from "./component/layout/Contact/Contact";
import MyOrders from "./component/Order/MyOrder.jsx"
import Home from "./component/Home/Home";
import Product from "./component/Home/ProductCard";
import Loader from "./component/layout/Loader/Loader";
import OrderDetails from "./component/Order/orderDetails";
import Header from "./component/layout/Header/Header";
import ProductDetails from "./component/Product/ProductDetails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import OrderList from "./component/admin/OrderList"
import ProcessOrder from "./component/admin/ProcessOrder";


const App = () => {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);


  return (
    <>
      <Router>

        <Header />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path='/loader' element={<Loader />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<OrderList />} />



        </Routes>
      </Router>
    </>
  );
}

export default App;
