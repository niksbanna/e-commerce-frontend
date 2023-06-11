import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    console.log('order', order, loading)
    if (!loading && !Object?.keys(order ?? {}).length > 0) {
      alert("Please login first.")
      navigate('/login')
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);

  return (
    <Fragment>
      <MetaData title="Order Details" />
      <div className="dashboard1">
        <h1 className="pageTitle">Order #{order && order._id}</h1>
        <div className="dashboardContainer1">
          <div className="second">
            <div className="section">
              <h2 className="sectionTitle">Order Items</h2>
              <div className="orderItems">
                {order?.orderItems?.map((item) => (
                  <div className="orderItem" key={item.product}>
                    <div className="itemImage">
                      <img src={item.image} alt="Product" />
                    </div>
                    <div className="itemDetails">
                      <Link to={`/product/${item.product}`} className="itemName">{item.name}</Link>
                      <div className="itemPrice">
                        {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="first">
            <div className="section">
              <h2 className="sectionTitle">Shipping Info</h2>
              <div className="orderSummary">
                <div className="orderSummaryBox">
                  <p className="summaryLabel">Name:</p>
                  <span className="summaryValue">{order?.user?.name}</span>
                </div>
                <div className="orderSummaryBox">
                  <p className="summaryLabel">Phone:</p>
                  <span className="summaryValue">{order?.shippingInfo?.phoneNo}</span>
                </div>
                <div className="orderSummaryBox">
                  <p className="summaryLabel">Address:</p>
                  <span className="summaryValue">
                    {order?.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="sectionTitle">Payment</h2>
              <div className="orderSummary">
                <div className="orderSummaryBox">
                  <p className={`statusLabel ${order?.paymentInfo?.status === "succeeded" ? "greenColor" : "redColor"}`}>
                    {order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
                  </p>
                </div>
                <div className="orderSummaryBox">
                  <p className="summaryLabel">Amount:</p>
                  <span className="summaryValue">{order?.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="sectionTitle">Order Status</h2>
              <div className="orderSummary">
                <div className="orderSummaryBox">
                  <p className={`statusLabel ${order?.orderStatus === "Delivered" ? "greenColor" : "redColor"}`}>
                    {order?.orderStatus}
                  </p>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
