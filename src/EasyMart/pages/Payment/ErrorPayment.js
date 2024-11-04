import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ErrorPayment = () => {
    document.title = 'Error Payment';
    const { getStarting} = useAuth();

    const {errorMessage} = useParams();

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div>
                    <h1 className="mx-4">404</h1>
                </div>
                <div>
                    <h5>Payment UnSuccessful</h5>
                    <p> {errorMessage}</p>
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

export default ErrorPayment;