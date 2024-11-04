import React from 'react';
import { Container, Nav, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Footer.css';

const Footer = () => {
    const { getStarting } = useAuth();

    const hostName = window.location.hostname;
    return (
        <div style={{backgroundColor: `${getStarting?.primaryColor}`, zIndex: '99'}} className="footer-container print-d-none">
            <Container>
                <div className="footer py-3">
                    <div>
                        <div className="footer-logo">
                            <Link to='/' style={{backgroundColor: "#fff", borderRadius: "5px"}}>
                                {   getStarting.logo ?
                                    <img src={getStarting?.logo} style={{width: '100%'}} alt="" />
                                    :
                                    <div className="mx-auto" style={{color: `${getStarting?.primaryColor}`}}>
                                        <Spinner animation="border" variant="danger"/>
                                    </div>
                                }
                            </Link>
                        </div>
                        <span className="footer-powered-by" style={{fontSize: '14px', marginTop: '6px', color: '#fff'}}>
                            {/* ©2022 by&nbsp;<Nav.Link  href={'https://' + hostName} target="_blank" style={{color: '#fff', padding: '0'}}>{hostName}</Nav.Link>&nbsp;Powered by&nbsp;<Nav.Link href="https://selfeb.com/" target="_blank" style={{color: '#000', padding: '0'}}>Selfeb</Nav.Link> */}
                            Powered by&nbsp;<Nav.Link href="https://easymart.com/" target="_blank" style={{color: '#fff', padding: '0'}}>Easy Mart</Nav.Link>
                        </span>
                    </div>
                    <div className="footer-details">
                        <div>
                            <h4>Customer Care</h4>
                            <div className="mt-4">
                                <Link to="/contact"><span>Contact Us</span></Link>
                                <Link to="/about"><span>About Us</span></Link>
                            </div>
                        </div>
                        <div>
                            <h4>Policy</h4>
                            <div className="mt-4">
                                <Link to="/privacy_policy"><span>Privacy policy</span></Link>
                                <Link to="/return_policy"><span>Refund Policy</span></Link>
                                {/* <Link to="/"><span>Return Policy</span></Link>
                                <Link to="/"><span>Shipping Policy</span></Link> */}
                            </div>
                        </div>
                        <div>
                            <h4>Contact Us</h4>
                            <div className="mt-4">
                                <Link to="/"><span>{getStarting?.email}</span></Link>
                                <Link to="/"><span>{getStarting?.phone}</span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;