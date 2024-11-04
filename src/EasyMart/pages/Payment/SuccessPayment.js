import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SuccessPayment = () => {
    document.title = 'Success Payment';
    const { getStarting, setCart} = useAuth();


    const { pathname } = useLocation();

    useEffect(() => {
        localStorage.removeItem('shopping_cart');
        setCart([]);
    }, [pathname]);

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div>
                    <h1 className="mx-4">200</h1>
                </div>
                <div>
                    <h5>Payment Successfully</h5>
                    <p>Your payment has been successfully</p>
                    <Link to="/products">
                        <button style={{backgroundColor:  getStarting?.primaryColor}} className="bg-sky text-white border-0 py-2 px-5 rounded ">
                        Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SuccessPayment;