import { faShoppingBasket, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav, Offcanvas, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './HeaderMobileMenu.css';

const HeaderMobileMenu = ({menuShow, handleMenuClose, menuBox, ...props}) => {
    const {getStarting, cart, handleLogout, user} = useAuth();


    let cartLength = 0;
    let cartPrice = 0;
    // let offerPrice = 0;
    if(!cart){
 
    }
    else{
     for(const product of cart){
         if(!product.quantity){
             product.quantity = 1;
         }
         cartLength = cartLength + product.quantity ;
         cartPrice =  cartPrice + product.sell_price * product.quantity;
 
        //  const offer = ( product.sell_price * product.discount ) / 100;
        //  const discount = product.sell_price - offer;
        //  offerPrice = offerPrice + discount * product.quantity;
     }
 }
    return (
        <div>
            <Offcanvas {...props} show={menuShow} onHide={handleMenuClose} style={{overflow: menuBox === false ? 'visible' : 'hidden'}}>
                <Offcanvas.Header closeButton> {/* closeButton */}
                <Offcanvas.Title onClick={handleMenuClose}>
                    <Link to="/">
                        {/* <img src="https://beshop-demo.vercel.app/assets/img/header-logo.svg" alt="" /> */}
                        {   getStarting.logo ?
                            <img src={ getStarting.logo} className="w-75" alt="" />
                            :
                            <div className="mx-auto" style={{color: `${getStarting?.primaryColor}`}}>
                                <Spinner animation="border" variant="danger"/>
                            </div>
                        }
                    </Link>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="header-mobile-menubar">
                    <div onClick={handleMenuClose}>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        {/* <Nav.Link as={Link} to="/products">All Products</Nav.Link> */}
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        { 
                            (user?.email || user?.phoneNumber)?
                            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                            :
                            ''
                        }
                        <Nav.Link as={Link} to="/cart" className="header-mobile-menu-cart">Cart <FontAwesomeIcon icon={faShoppingBasket}/>{cart?.length > 0 ? <span style={{backgroundColor: `${getStarting.primaryColor}`}}>{cart?.length}</span> : ''}</Nav.Link>
                        {/* <Nav.Link as={Link} to="/cart">Cart&nbsp;<FontAwesomeIcon icon={faShoppingBasket}/>{cartLength ? <span style={{backgroundColor: `${getStarting.primaryColor}`}}>{cartLength}</span> : ''}</Nav.Link> */}
                        {  (user?.email || user?.phoneNumber) ?
                            <Nav.Link as={Link} to="/login">LogOut <FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}/></Nav.Link>
                            :
                            <Nav.Link as={Link} to="/login">Login <FontAwesomeIcon icon={faUser} /></Nav.Link>
                        }
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default HeaderMobileMenu;