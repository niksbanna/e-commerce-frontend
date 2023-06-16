import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "./Sidebar";
import {
    getOrderDetails,
    clearErrors,
    updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ alert }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const { id } = useParams();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("status", status);

        dispatch(updateOrder(id, formData));
        alert("Order updated successfully.")
    };

    useEffect(() => {
        if (error) {
            return alert(error, "error");
        }
        if (updateError) {
            dispatch(clearErrors());
        }
        if (isUpdated) {
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order?.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <div>Shipping Info</div>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order?.user?.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>{order?.shippingInfo?.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order?.shippingInfo?.address}, {order?.shippingInfo?.city},{" "}
                                                {order?.shippingInfo?.state}, {order?.shippingInfo?.pinCode},{" "}
                                                {order?.shippingInfo?.country}
                                            </span>
                                        </div>
                                    </div>

                                    <div>Payment</div>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order?.paymentInfo?.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order?.totalPrice}</span>
                                        </div>
                                    </div>

                                    <div>Order Status</div>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order?.orderStatus === "Delivered" ? "greenColor" : "redColor"
                                                }
                                            >
                                                {order?.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <div>Your Cart Items:</div>
                                    <div className="confirmCartItemsContainer">
                                        {order?.orderItems?.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order?.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form className="updateOrderForm" onSubmit={updateOrderSubmitHandler}>
                                    <h1>Process Order</h1>

                                    <div>
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Status</option>
                                            {order?.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                                            {order?.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                                        </select>
                                    </div>

                                    <button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading || status === ""}
                                    >
                                        Process
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
