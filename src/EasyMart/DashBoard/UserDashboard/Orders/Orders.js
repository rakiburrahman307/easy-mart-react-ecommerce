import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './Orders.css';

const Orders = () => {
    const {getStarting, userOrder} = useAuth();
    const navigate = useNavigate();

    const handleOrderDetails = (_id) => {
        navigate(`/invoice/${_id}`);
    }


    return (
        <div className="tmp-user-orders-container">
            <h3>Orders</h3>
            {
                userOrder?.length === 0 ?
                <div className="text-center">
                    <h5 style={{ color: `#757575`, margin: '20px 0'}}>There are no orders</h5>
                    <Link to="/">
                        <Button variant="primary" style={{backgroundColor: `${getStarting.primaryColor}`, border: 'none'}}>Back Home</Button>
                    </Link>
                </div>
                :
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
                    {
                        userOrder?.slice(0).reverse().map((order, i) => <tbody key={i}>
                            <tr>
                                <td>#{order?.invoice}</td>
                                <td>{order?.order_date}</td>
                                <td className="status">{
                                        (order.order_status === 1 && <button style={{ color: '#2196f3'}}>Pending</button>) ||
                                        (order.order_status === 2 && <button style={{ color: '#0b62a7'}}>Processing</button>) ||
                                        (order.order_status === 3 && <button style={{ color: '#19573a'}}>Delivered</button>) ||
                                        (order.order_status === 4 && <button style={{ color: '#dc3545'}}>Cancel</button>) ||
                                        (order.order_status === 5 && <button style={{ color: '#dc3545'}}>Return</button>)
                                    }
                                </td>
                                <td>{order.payment_amount}</td>
                                <td>{order.payment_method}</td>
                                <td>
                                    <Button disabled={order._id ? false : true} onClick={() => handleOrderDetails(order._id)} style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}><FontAwesomeIcon icon={faEye} /> <span className="view-text">View</span></Button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </Table>
            }
        </div>
    );
};

export default Orders;

