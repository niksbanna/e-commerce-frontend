import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

export const MyOrders = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!Object.keys(user ?? {}).length > 0) {
      alert("Please login first.")
      navigate('/login');
    }
  }, [])
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        const status = params.row.status; // Access the 'status' field from the row
        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const orderId = params.id;
        return (
          <Link to={`/order/${orderId}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = orders?.map((item) => ({
    itemsQty: item.orderItems?.length || 0,
    id: item._id,
    status: item.orderStatus,
    amount: item.totalPrice,
  })) || [];

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch, myOrders]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
