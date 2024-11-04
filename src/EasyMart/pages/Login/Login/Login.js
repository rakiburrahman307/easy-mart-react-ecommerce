import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import googleImage from "../../../images/login/google-logo.png";
import phoneImage from "../../../images/login/phone.jpg";
import './Login.css';

const Login = () => {
    document.title = "Login";
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [passwordShown, setPasswordShown] = useState(false);
    const {getStarting, user, loginUser, signInWithGoogle, isLoading, authError} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();


    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, navigate);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, navigate)
    }
    return (
        <Container>
             <>
                <style type="text/css">
                    {
                        `.tmp-login-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 2px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>
            <div className="tmp-login-container">
                <h3 className="pb-3 text-center" style={{color: `${getStarting.primaryColor}`}}>Please Login</h3>
                <div className="tmp-login-with-phone">
                    <form onSubmit={handleLoginSubmit}>
                        <input value={loginData?.email } name="email" type="email" onChange={handleOnChange} placeholder="Your Email *" style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                        <br/>
                        <span>
                            <input value={loginData?.password } type={passwordShown ? "text" : "password"} name="password" onChange={handleOnChange} placeholder="Your Password *" required style={{border: `2px solid ${getStarting.primaryColor}`}}/>
                            <div className="hide-button" onClick={() => setPasswordShown(!passwordShown)}><FontAwesomeIcon icon={passwordShown ? faEye : faEyeSlash}/></div>
                        </span>
                        <br/>
                        <input type="submit" value="Login" style={{backgroundColor: `${getStarting.primaryColor}`}}/>
                    </form>
                </div>
                <div className="login-three-btn">
                    <button onClick={() => setLoginData({email: "user@gmail.com", password: "123456",})}>User</button>
                    <button onClick={() => setLoginData({email: "vendor@gmail.com", password: "123456",})}>Vendor</button>
                    <button onClick={() => setLoginData({email: "admin@gmail.com", password: "123456",})}>Admin</button>
                </div>
                <div className="google-phone-container" onClick={handleGoogleSignIn} style={{border: `2px solid ${getStarting.primaryColor}`}}>
                    <img src={googleImage} alt="google" style={{width: "50px", padding: "2px 10px 1px"}}/>
                    <Button style={{backgroundColor: `${getStarting.primaryColor}`}} className="google-phone">Google Signin</Button>
                </div>

                <Link to="/phonesignup">
                    <div className="google-phone-container" style={{border: `2px solid ${getStarting.primaryColor}`}}>
                        <img src={phoneImage} alt="google" style={{height: "40px", padding: "0px 8px"}}/>
                        <Button style={{backgroundColor: `${getStarting.primaryColor}`}} className="google-phone">Phone Signin</Button>
                    </div>
                </Link>

                {isLoading && <p className="text-center">Loading...</p>}
                {user?.email && <p className="text-center" style={{color:'green'}}>Login successfully!</p>}
                {authError && <p className="text-center" style={{color: '#ff4747'}}>{authError}</p>}
                <div className="text-center">
                    <span>New Member? <Link to="/register" style={{color: `${getStarting.primaryColor}`}}>Register</Link> here</span>
                </div>

                
            </div>
        </Container>
    );
};

export default Login;