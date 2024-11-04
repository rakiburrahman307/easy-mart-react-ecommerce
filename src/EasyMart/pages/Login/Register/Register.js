import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Register = () => {
    document.title = "Register";

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});
    const {getStarting, user, authError, registerUser, isLoading} = useAuth();
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordShownTwo, setPasswordShownTwo] = useState(false);


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        e.preventDefault();
        if(loginData.password !== loginData.password2){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Your Password dit not match',
            })
            setLoginData({});
            return;
        }
        registerUser(loginData.email, loginData.password, loginData.name, loginData.phoneNumber, navigate)
    }


    return (
        <Container>
             <>
                <style type="text/css">
                    {
                        `.tmp-register-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 2px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>
            <div className="tmp-register-container">
                <h3 className="pb-3 text-center" style={{color: `${getStarting.primaryColor}`}}>Please Register</h3>
                <div className="tmp-register-with-phone">
                    <form onSubmit={handleLoginSubmit}>
                        <input type="text" name="name" onBlur={handleOnBlur} placeholder="Your Name" required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                        <br />
                        <input type="email" name="email" onBlur={handleOnBlur} placeholder="Your Email" required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                        <br/>
                        <input type="number" name="phoneNumber" onBlur={handleOnBlur} placeholder="Your Number" required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                        <br/>
                        <span>
                            <input type={passwordShown ? "text" : "password"} name="password" placeholder="Your Password" onBlur={handleOnBlur} required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                            <div className="hide-button" onClick={() => setPasswordShown(!passwordShown)}><FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash}/></div>
                        </span>
                        <br/>
                        <span>
                            <input type={passwordShownTwo ? "text" : "password"} name="password2" placeholder="ReType Your Password" onBlur={handleOnBlur} required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                            <div className="second-hide-button" onClick={() => setPasswordShownTwo(!passwordShownTwo)}><FontAwesomeIcon icon={passwordShownTwo ? faEye : faEyeSlash}/></div>
                        </span>
                        <br/>
                        <input type="submit" value="Register" style={{backgroundColor: `${getStarting.primaryColor}`}}/>
                    </form>
                </div>
                {/* <p className="text-center" style={{color: registerMessage === "customer created and otp sent successfully" ? 'green' : '#ff4747'}}>{registerMessage ? registerMessage : ''}</p> */}
                {isLoading && <p className="text-center">Loading...</p>}
                {user?.email && <p className="text-center" style={{color:'green'}}>Login successfully!</p>}
                {authError && <p className="text-center" style={{color: '#ff4747'}}>{authError}</p>}
                <div className="text-center">
                    <span>Already member?? <Link to="/login" style={{color: `${getStarting.primaryColor}`}}>Login</Link> here</span>
                </div>
            </div>
        </Container>
    );
};

export default Register;