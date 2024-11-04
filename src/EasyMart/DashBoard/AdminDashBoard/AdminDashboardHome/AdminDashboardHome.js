import React, { useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import './AdminDashboardHome.css';


const sellData = [
    { name: 'Jan',  uv: 4000, pv: 2400, amt: 2400, },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'March', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'April', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181, },
    { name: 'June', uv: 2390, pv: 3800, amt: 2500, },
    { name: 'July', uv: 3490, pv: 4300, amt: 2100, },
    { name: 'Aug',  uv: 4000, pv: 2400, amt: 2400, },
    { name: 'Sep', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'Oct', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'Nov', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'Dec', uv: 1890, pv: 4800, amt: 2181, }
  ];

const AdminDashboardHome = () => {
    const { totalOrder, userList, userOrder, handleProductOrders} = useAuth();

    useEffect( () => {
        handleProductOrders();
    }, [])
    
    const dashboardData = [
        { title: 'Users', count : userList?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Order', count : totalOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Pending', count : totalOrder?.filter(order => order.order_status === 1).length,  update: 'Updated 2 minutes ago' },
        { title: 'Premium User', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Free User', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Active User', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Today Sell Amount', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'Total Sell Amount', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        // { title: 'Today Due Amount', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
        { title: 'total Due Amount', count : userOrder?.length,  update: 'Updated 2 minutes ago' },
    ]

    return (
        <div>
               <div className="admin-dashboard-home-content-container">
                {
                    dashboardData?.map((data, i) =>  (
                        <div key={i} className="admin-dashboard-home-content">
                            <h4>{data.title}</h4>
                            <h5>{data.count || 0}</h5>
                            <p>{data.update}</p>
                        </div>
                    ))
                }
               </div>

                <div className="overflow-x-auto">
                    {/* <ResponsiveContainer width="100%" height="100"> */}
                        <LineChart
                            width={1300}
                            height={300}
                            data={sellData}
                            margin={{
                                top: 30,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    {/* </ResponsiveContainer> */}
                </div>
        </div>
    );
};

export default AdminDashboardHome;