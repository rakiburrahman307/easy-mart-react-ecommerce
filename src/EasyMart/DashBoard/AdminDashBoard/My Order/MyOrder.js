import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";


const MyOrder = () => {
    const {getStarting, totalOrder, setTotalOrder, handleProductOrders, vendorUser} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const vendorsOrder = totalOrder.filter(data => data.vendors_name === vendorUser.vendors_name && data.vendorUser === true);
        if(vendorsOrder?.length > 0){
            setOrders(vendorsOrder);
        }
        else{
            setOrders([...totalOrder]);
        }
    },[totalOrder, vendorUser])
    return (
        <div>
            
        </div>
    );
};

export default MyOrder;