import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCartPlus, faHeadset, faSearch, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import './Header.css';

const Header = () => {
  const { getStarting, user ,logOut} = useAuth();

  return (
    <>
     <style type="text/css">
          {
            ` 
            .tmp10-suggestSearch .suggest-search-btn:hover {
              color: ${getStarting?.primaryColor} !important;
            }

            `
          }
      </style>
      <div className="sticky-top">
        <div className="tmp10-top-header">
            <Navbar collapseOnSelect expand="lg"  variant="dark">
                <Container>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav as={Link} to="/">
                      <div style={{width: '300px'}}>
                          {   getStarting.logo ?
                              <div style={{maxWidth: '200px'}}>
                                  <img src={ getStarting.logo} className="w-75" alt="" />
                              </div>
                              :
                              <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                                  <Spinner animation="border" variant="danger"/>
                              </div>
                          }
                      </div>
                    </Nav>
                    <Nav className="mx-auto">
                        <form className="tmp10-header-form">
                            <input type="text" placeholder="Search Your Products..."/>
                            <span style={{position: 'absolute', right: '90px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                              <FontAwesomeIcon icon={faTimes}/>
                            </span>
                            <Link to="/products">
                                <button className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`, color: '#fff'}}><FontAwesomeIcon icon={faSearch}/></button>
                            </Link>
                        </form>
                    </Nav>
                    <Nav>
                    <Navbar.Brand>
                        <Nav className="tmp10-header-icon-container">
                          <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#3B5998', color: '#fff'}}><FontAwesomeIcon icon={faFacebookF}/></div></Nav.Link>
                          <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#26A6D1', color: '#fff'}}><FontAwesomeIcon icon={faTwitter}/></div></Nav.Link>
                          <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#3F729B', color: '#fff'}}><FontAwesomeIcon icon={faInstagram}/></div></Nav.Link>
                          <Nav.Link href="callto: ++8809609414141" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faHeadset}/></div></Nav.Link>
                        </Nav>
                    </Navbar.Brand>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

        <div className="tmp10-header" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
              <Nav>
                <Nav.Link as={Link} to="/" style={{marginRight: '20px'}}>Home</Nav.Link>
                <Nav.Link as={Link} to="/products" style={{marginRight: '20px'}}>Products</Nav.Link>
                <Nav.Link as={Link} to="/about" style={{marginRight: '20px'}}>About</Nav.Link>
                <Nav.Link as={Link} to="/contact" style={{marginRight: '20px'}}>Contact</Nav.Link>
                {
                    user?.email ?
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    :
                    ''
                } 
              </Nav>
              <Nav>
                <div style={{margin: 'auto'}}>
                    {   user?.email ?
                      <Link to="/login" onClick={logOut}><span style={{color: '#fff'}}>LogOut <FontAwesomeIcon icon={faSignOutAlt}/></span></Link>
                      :
                      <>
                        <Link to="/login"><span style={{color: '#fff'}}>Login</span></Link>
                        <span> / </span>
                        <Link to="/register"><span style={{color: '#fff'}}>Register</span></Link>
                      </>
                    }  
                </div>
                <Nav.Link as={Link} to="/cart" style={{marginLeft: '20px'}}><span className="tmp10-header-cart"><FontAwesomeIcon icon={faCartPlus} /><span>0</span></span></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
      </div>
      <MobileHeader></MobileHeader>
      <MobileFooter></MobileFooter>
    </>

  );
};

export default Header;


