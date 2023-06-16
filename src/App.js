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
import NewProduct from "./component/admin/NewProduct";
import { ToastContainer, toast } from "react-toastify";
import Cart from "./component/Cart/Cart";
import Products from "./component/Product/Products";
import UsersList from "./component/admin/UsersList";
import ProductReviews from "./component/admin/ProductReview";


const App = () => {

  const handleToast = (msg, type) => {
    if (type === "error") {
      notifyErrorAlert(msg);
    } else {
      notifySuccessAlert(msg);
    }
  }

  const toastOptions = {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  const notifyErrorAlert = (error) => {
    toast.error(`Error: ${error} `, toastOptions);
  };
  const notifySuccessAlert = (success) => {
    toast.success(`${success}`, toastOptions);
  };

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

        <Header alert={handleToast} />

        <Routes>

          <Route path="/" element={<Home alert={handleToast} />} />
          <Route path="/about" element={<About />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard alert={handleToast} />} />
          <Route path="/products" element={<Products alert={handleToast} />} />
          <Route path='/loader' element={<Loader />} />
          <Route path="/login" element={<LoginSignup alert={handleToast} />} />
          <Route path="/orders" element={<MyOrders alert={handleToast} />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path='/product/:id' element={<ProductDetails alert={handleToast} />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/admin/products" element={<ProductList alert={handleToast} />} />
          <Route path="/admin/orders" element={<OrderList alert={handleToast} />} />
          <Route path="/admin/order/:id" element={<ProcessOrder alert={handleToast} />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/admin/reviews" element={<ProductReviews alert={handleToast} />} />





        </Routes>
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
