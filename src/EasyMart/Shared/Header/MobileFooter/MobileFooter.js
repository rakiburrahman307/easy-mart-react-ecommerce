import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket, faSlidersH, faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import HeaderMobileMenu from '../HeaderMobileMenu/HeaderMobileMenu';
import useAuth from '../../../hooks/useAuth';
import './MobileFooter.css';

const MobileFooter = () => {
    const {getStarting, cart} = useAuth();

    const [menuBox, setMenuBox] = useState(false);
    const [searchBox, setSearchBox] = useState(false);

    const [menuShow, setMenuShow] = useState(false);
    const [searchBarShow, setSearchBarShow] = useState(false);

    const handleMenuClose = () => {
        setMenuShow(false);
        setMenuBox(true);
    };
    const handleMenuShow = () => {
        setMenuShow(true);
        setMenuBox(false);
    };

    const handleSearchBarClose = () => {
        setSearchBarShow(false);
        setSearchBox(true);
    };
    const handleSearchBarShow = () => {
        setSearchBarShow(true);
        setSearchBox(false);
    };
    return (
        <div className="tmp-mobile-footer-menu">
            <Navbar>
                <Container>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">
                            <div className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon icon={faHome}  className="icon"/>
                                <h6>Home</h6>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="" onClick={handleSearchBarShow}>
                            <div className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon icon={faSlidersH} className="icon"/>
                                <h6>Categories</h6>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="tmp-mobile-footer-cart">
                            <div className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon icon={faShoppingBasket} className="icon"/>{cart?.length > 0 ? <span style={{backgroundColor: `${getStarting?.primaryColor}`}}>{cart?.length}</span> : ''}
                                <h6>Cart</h6>
                            </div>
                        </Nav.Link>
                        <Nav.Link as={Link} to="" onClick={handleMenuShow}>
                            <div className="d-flex flex-column align-items-center">
                                <FontAwesomeIcon icon={faBars} className="icon"/>
                                <h6>Menu</h6>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Container>
            <SearchBar searchBarShow={searchBarShow} handleSearchBarClose={handleSearchBarClose} searchBox={searchBox}></SearchBar>
            <HeaderMobileMenu placement="end" menuShow={menuShow} handleMenuClose={handleMenuClose} menuBox={menuBox}></HeaderMobileMenu>
            </Navbar>
        </div>
    );
};

export default MobileFooter;