import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProducts from '../DashBoard/AdminDashBoard/AddProducts/AddProducts';
import MakeAdmin from '../DashBoard/AdminDashBoard/MakeAdmin/MakeAdmin';
import ManageBrands from '../DashBoard/AdminDashBoard/ManageBrands/ManageBrands';
import ManageCategories from '../DashBoard/AdminDashBoard/ManageCategories/ManageCategories';
import ManageOrder from '../DashBoard/AdminDashBoard/ManageOrder/ManageOrder';
import ManageOrderDetails from '../DashBoard/AdminDashBoard/ManageOrder/ManageOrderDetails/ManageOrderDetails';
import ManageProducts from '../DashBoard/AdminDashBoard/ManageProducts/ManageProducts';
import ManageUsers from '../DashBoard/AdminDashBoard/ManageUsers/ManageUsers';
import ManageVendors from '../DashBoard/AdminDashBoard/ManageVendors/ManageVendors';
import MessageDetails from '../DashBoard/AdminDashBoard/ReceivedMessage/MessageDetails/MessageDetails';
import ReceivedMessage from '../DashBoard/AdminDashBoard/ReceivedMessage/ReceivedMessage';
import AccountDetails from '../DashBoard/Shared/AccountDetails/AccountDetails';
import Dashboard from '../DashBoard/Shared/Dashboard/Dashboard';
import DashboardHome from '../DashBoard/Shared/DashboardHome/DashboardHome';
import OrderDetails from '../DashBoard/UserDashboard/OrderDetails/OrderDetails';
import Orders from '../DashBoard/UserDashboard/Orders/Orders';
import CustomerChatBot from '../Shared/CustomerChatBot/CustomerChatBot';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import TopScroll from '../Shared/TopScroll/TopScroll';
import About from '../pages/About/About';
import AllProducts from '../pages/AllProducts/AllProducts';
import Cart from '../pages/Cart/Cart';
import Checkout from '../pages/Checkout/Checkout';
import Contact from '../pages/Contact/Contact';
import Home from '../pages/Home/Home/Home';
import AdminRoute from '../pages/Login/AdminRoute/AdminRoute';
import Login from '../pages/Login/Login/Login';
import PhoneSignUp from '../pages/Login/PhoneSignUp/PhoneSignUp';
import PrivateRoute from '../pages/Login/PrivateRoute/PrivateRoute';
import Register from '../pages/Login/Register/Register';
import NotFound from '../pages/NotFound/NotFound';
import ErrorPayment from '../pages/Payment/ErrorPayment';
import SuccessPayment from '../pages/Payment/SuccessPayment';
import ProductsDetails from '../pages/ProductsDetails/ProductsDetails';
import ProductsVendors from '../pages/ProductsVendors/ProductsVendors';
import './EasyMart.css';
import ManageCoupon from '../DashBoard/AdminDashBoard/ManageCoupon/ManageCoupon';


const getFromLocalStorageStarting = () => {
    const getSetting = localStorage.getItem('starting')
    if(getSetting) {
        return JSON.parse(localStorage.getItem('starting'))
    } else {
        return []
    }
  } 

const EasyMart = () => {
    document.title = `${getFromLocalStorageStarting().companyName}`;
    return (
        <div className="tmp10">
            <Router>
                <Header/>
                <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/products" element={<AllProducts />} />
                <Route path="/product/:productSlug" element={<ProductsDetails />}></Route>
                <Route path="/products/vendors/:vendorsName" element={<ProductsVendors />} />
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                    <Route path="/dashboard" element={<PrivateRoute><DashboardHome/></PrivateRoute>}></Route>
                    <Route path="/dashboard/orders" element={<PrivateRoute><Orders/></PrivateRoute>}></Route>
                    <Route path="/dashboard/account" element={<PrivateRoute><AccountDetails/></PrivateRoute>}></Route>

                    <Route path="/dashboard/manageorder" element={<AdminRoute><ManageOrder/></AdminRoute>}></Route>
                    <Route path="/dashboard/manageorder/:orderId" element={<AdminRoute><ManageOrderDetails/></AdminRoute>}></Route>
                    <Route path="/dashboard/message" element={<AdminRoute><ReceivedMessage/></AdminRoute>}></Route>
                    <Route path="/dashboard/message/:messageId" element={<AdminRoute><MessageDetails/></AdminRoute>}></Route>
                    <Route path="/dashboard/addproducts" element={<AdminRoute><AddProducts/></AdminRoute>}></Route>
                    <Route path="/dashboard/manageproducts" element={<AdminRoute><ManageProducts/></AdminRoute>}></Route>
                    <Route path="/dashboard/managecategories" element={<AdminRoute><ManageCategories/></AdminRoute>}></Route>
                    <Route path="/dashboard/managebrands" element={<AdminRoute><ManageBrands/></AdminRoute>}></Route>
                    <Route path="/dashboard/managevendors" element={<AdminRoute><ManageVendors/></AdminRoute>}></Route>
                    <Route path="/dashboard/manageuser" element={<AdminRoute><ManageUsers/></AdminRoute>}></Route>
                    <Route path="/dashboard/makeadmin" element={<AdminRoute><MakeAdmin/></AdminRoute>}></Route>
                    <Route path="/dashboard/coupon" element={<AdminRoute><ManageCoupon/></AdminRoute>}></Route>
                </Route>
                <Route path="/payment/success" element={<PrivateRoute><SuccessPayment/></PrivateRoute>}></Route>
                <Route path="/payment/error/:errorMessage" element={<PrivateRoute><ErrorPayment/></PrivateRoute>}></Route>

                <Route path="/invoice/:orderId" element={<PrivateRoute><OrderDetails/></PrivateRoute>}></Route>
                <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/phonesignup" element={<PhoneSignUp />}></Route>
                <Route path="*" element={<NotFound />} />
                </Routes>
                <TopScroll/>
                <CustomerChatBot/>
                <Footer/>
            </Router>
        </div>
    );
};

export default EasyMart;