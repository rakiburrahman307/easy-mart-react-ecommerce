import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './LoginCode.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const LoginCode = () => {
   

    const { getStarting, handleSubmit, onLoginCode, onLoginSubmit, register, loginCodeMessage} = useAuth();
    const navigate = useNavigate();
    
    const loginNumber = JSON.parse(localStorage.getItem('Auth'));
    

    const onSubmit = (data) => {
        onLoginCode(data, navigate);
    };

    const handleResendOTP = (data) => {
        onLoginSubmit(data, navigate);
        // alert('ResendOTP')
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: "Successfully Resend OTP",
            showConfirmButton: false,
            timer: 2000
        })
    }
    return (
        <Container>
             <>
                <style type="text/css">
                    {
                        `.tmp-OTP-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 2px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>
            <div className="tmp-OTP-container">
                <h3 className="pb-3 text-center" style={{color: `${getStarting?.primaryColor}`}}>Please enter the one time password to verify your account</h3>
                <p className="text-center">A code has been sent to ****{loginNumber?.phone}</p>
                <div className="tmp-OTP-with-phone">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" defaultValue={loginNumber?.phone} {...register("phone")} style={{display: 'none'}}/>
                        <input type="text" placeholder="Your OTP" {...register("otp")} required style={{border: `${getStarting?.primaryColor}`}}/>
                        <p className="text-center" style={{marginTop: '10px', color: loginCodeMessage === "Customer login successfully" ? 'green' : '#ff4747'}}>{loginCodeMessage ? loginCodeMessage : ''}</p>
                        <input type="submit" value="Validate" style={{backgroundColor: `${getStarting?.primaryColor}`}}/>
                        <br />
                    </form>
                    <div className="text-center">
                        <button onClick={() => handleResendOTP(JSON.parse(localStorage.getItem('Auth')))}>Resend OTP</button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default LoginCode;