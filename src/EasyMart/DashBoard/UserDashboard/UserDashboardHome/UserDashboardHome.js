import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Orders from '../Orders/Orders';
import './UserDashboardHome.css';

const UserDashboardHome = () => {
    const { userOrder, handleProductOrders} = useAuth();
    const [pending, setPending] = useState([]);
    const [processing, setProcessing] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [orderReturn, setOrderReturn] = useState([]);
    const [orderCancel, setOrderCancel] = useState([]);

    const dashboardData = [
        { title: 'Order', order : userOrder?.length },
        { title: 'Pending', order : pending?.length },
        { title: 'Processing', order : processing?.length },
        { title: 'Delivered', order : delivered?.length },
        { title: 'Return', order : orderReturn?.length },
        { title: 'Cancel', order : orderCancel?.length }
    ]

    useEffect( () => {
        setPending(userOrder?.filter(data => data.order_status === 1))
        setProcessing(userOrder?.filter(data => data.order_status === 2))
        setDelivered(userOrder?.filter(data => data.order_status === 4))
        setOrderReturn(userOrder?.filter(data => data.order_status === 6))
    }, [userOrder])

    useEffect(() => {
        handleProductOrders();
    },[])
    return (
        <div>
            {/* <h2>Hello <span style={{color: `${getStarting?.primaryColor}`}}>{customer.name}</span></h2> */}
            {/* <p>From your account dashboard. you can easily check & view your recent orders,
                manage your shipping and billing addresses and edit your password and account details.</p> */}
               <div className="user-dashboard-home-content-container">
                {
                    dashboardData?.map((data, i) =>  <div key={i} className="user-dashboard-home-content">
                        <img src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif" alt="" />
                        <div className="content">
                            <h4>{data.title}</h4>
                            <h5>{data.order || 0}</h5>
                        </div>
                    </div>)
                }
               </div>

               <Orders/>
        </div>
    );
};

export default UserDashboardHome;