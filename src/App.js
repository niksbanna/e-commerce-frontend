import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
// import Loader from "./components/Loader/Loader.jsx";
// import Footer from "./components/layout/Footer/Footer.jsx";
import LoginSignup from "./component/User/LoginSignup";
// import Home from "./component/Home/Home";
import store from "./store"
import { loadUser } from "./actions/userAction";
import { useDispatch, useSelector } from "react-redux";

import Profile from "./component/User/Profile.jsx"
// import ProtectedRoute from "./components/Route/ProtectedRoute";
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
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log('isauthuser', isAuthenticated, user)

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);


  return (
    <>
      <Router>

        <Header />
        {/* {isAuthenticated && <UserOptions user={user} />}  */}
        <Routes>


          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path='/loader' element={<Loader />} />

          <Route path="/login" element={<LoginSignup />} />
          <Route path="/orders" element={<MyOrders user={user} />} />

          <Route path="/account" element={<Profile />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {/* <ProtectedRoute path="/me/update" element={<UpdateProfile/>} /> */}
          <Route path="/success" element={<OrderSuccess />} />

          {/* <Route path="/useroption" element={<UserOptions/>} /> */}

          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
      </Router>



    </>
  );
}

export default App;
