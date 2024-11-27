import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import "./ManageOrder.css";

const ManageOrder = () => {
  const {
    getStarting,
    totalOrder,
    setTotalOrder,
    handleProductOrders,
    vendorUser,
  } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const handleOrderDetails = (_id) => {
    navigate(`${_id}`);
  };

  useEffect(() => {
    handleProductOrders();
  }, []);

  useEffect(() => {
    const vendorsOrder = totalOrder.filter(
      (data) =>
        data.vendors_name !== vendorUser.vendors_name &&
        data.vendorUser !== true
    );
    if (vendorsOrder?.length > 0) {
      setOrders(vendorsOrder);
    } else {
      setOrders([...totalOrder]);
    }
  }, [totalOrder, vendorUser]);

  const handleUpdateStatus = (id, status) => {
    const updateStatus = parseInt(status);
    const url = `http://localhost:5000/orders/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ order_status: updateStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = totalOrder?.filter((order) => order._id === id);
          remaining[0].order_status = updateStatus;
          setTotalOrder([...totalOrder]);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dashboardData = [
    { title: "Order", count: orders?.length, update: "Updated 2 minutes ago" },
    {
      title: "Pending",
      count: orders?.filter((order) => order.order_status === 1).length,
      update: "Updated 2 minutes ago",
    },
    {
      title: "Delivered",
      count: orders?.filter((order) => order.order_status === 3).length,
      update: "Updated 2 minutes ago",
    },
  ];

  return (
    <div className='easy-mart-manage-orders-container'>
      <h2
        className='text-center py-1'
        style={{ color: getStarting?.primaryColor }}
      >
        Manage Orders
      </h2>
      {vendorUser.vendor && (
        <div className='admin-dashboard-home-content-container'>
          {dashboardData?.map((data, i) => (
            <div key={i} className='admin-dashboard-home-content'>
              <h4>{data.title}</h4>
              <h5>{data.count || 0}</h5>
              <p>{data.update}</p>
            </div>
          ))}
        </div>
      )}
      {orders?.length === 0 ? (
        <div className='text-center'>
          <h5 style={{ color: `#757575`, margin: "20px 0" }}>
            There are no orders
          </h5>
          <Link to='/'>
            <Button
              variant='primary'
              style={{
                backgroundColor: `${getStarting.primaryColor}`,
                border: "none",
              }}
            >
              Back Home
            </Button>
          </Link>
        </div>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Invoice_id</th>
              <th>Order_date</th>
              <th>Order_status</th>
              <th>Total_bill</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          {orders
            ?.slice(0)
            .reverse()
            .map((order, i) => (
              <tbody key={i}>
                <tr>
                  <td>#{order?.invoice}</td>
                  <td>{order?.order_date}</td>
                  <td className='status'>
                    {(order.order_status === 1 && (
                      <button style={{ color: "#2196f3" }}>Pending</button>
                    )) ||
                      (order.order_status === 2 && (
                        <button style={{ color: "#0b62a7" }}>Processing</button>
                      )) ||
                      (order.order_status === 3 && (
                        <button style={{ color: "#19573a" }}>Delivered</button>
                      )) ||
                      (order.order_status === 4 && (
                        <button style={{ color: "#dc3545" }}>Cancel</button>
                      )) ||
                      (order.order_status === 5 && (
                        <button style={{ color: "#dc3545" }}>Return</button>
                      ))}
                    &nbsp; &nbsp;
                    <select
                      onChange={(e) =>
                        handleUpdateStatus(order._id, e.target.value)
                      }
                      style={{
                        border: `1px solid ${getStarting?.primaryColor}`,
                      }}
                    >
                      <option value='status' style={{ display: "none" }}>
                        Status
                      </option>
                      <option value='1'>Pending</option>
                      <option value='2'>Processing</option>
                      <option value='3'>Delivered</option>
                      <option value='4'>Cancel</option>
                      <option value='5'>Return</option>
                    </select>
                  </td>
                  <td>{order.payment_amount}</td>
                  <td>{order.payment_method}</td>
                  <td>
                    <Button
                      disabled={order._id ? false : true}
                      onClick={() => handleOrderDetails(order._id)}
                      style={{
                        backgroundColor: `${getStarting?.primaryColor}`,
                        border: "none",
                      }}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      )}
    </div>
  );
};

export default ManageOrder;
