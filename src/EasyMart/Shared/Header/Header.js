import { faCartPlus, faHeadset, faSearch, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Dropdown, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Header.css';
import MobileFooter from './MobileFooter/MobileFooter';
import MobileHeader from './MobileHeader/MobileHeader';

// const websiteColor = ["#ff3030", "#009688", "#f57224", "#2196F3", "#32CD32", "#2948ff", "#3b76ef", "#4b6584", "#a66dd4" , "#FF7B36", "#558564" ,"#E8205E"]
const websiteColor = [
  {
    "color": "#ff3030",
    "logo": "https://i.ibb.co/4PcCjm8/02.png"
  },
  {
    "color": "#009688",
    "logo": "https://i.ibb.co/Xk7sdfL/01.png"
  },
  {
    "color": "#f57224",
    "logo": "https://i.ibb.co/ctLmxhN/03.png"
  },
  {
    "color": "#2196F3",
    "logo": "https://i.ibb.co/Y30kfC9/04.png"
  },
  {
    "color": "#32CD32",
    "logo": "https://i.ibb.co/3Tv6XH7/05.png"
  },
  {
    "color": "#2948ff",
    "logo": "https://i.ibb.co/z72sBfV/06.png"
  },
  {
    "color": "#3b76ef",
    "logo": "https://i.ibb.co/tLvXfPS/07.png"
  },
  {
    "color": "#4b6584",
    "logo": "https://i.ibb.co/qDzPwR4/08.png"
  },
  {
    "color": "#a66dd4",
    "logo": "https://i.ibb.co/S3Xx1fj/09.png"
  },
  {
    "color": "#FF7B36",
    "logo": "https://i.ibb.co/1qhy3J5/10.png"
  },
  {
    "color": "#558564",
    "logo": "https://i.ibb.co/zVppDzL/11.png"
  },
  {
    "color": "#E8205E",
    "logo": "https://i.ibb.co/bXNRKp2/12.png"
  },
]


const Header = () => {
  const navigate = useNavigate();
  const { headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, handleSearchClick, handleSearch,
           handleSuggestClick, user, logOut, cart, displayProducts, getStarting, handleClearAllProductsPage} = useAuth();


  const handleSearchChange = e => {
    handleSearch(e.target.value);
    setHeaderSearchText( e.target.value );
    e.target.value = '';
    setHeaderSuggestBox(false);
}

const handleSearchKeypress = e => {
  if (e.keyCode === 13) {
    handleSearchClick(e.target.value);
    e.target.value = '';
  }
};

const suggestClick = (e) =>{
    setHeaderSearchText(e);
    handleSuggestClick(e);
    setHeaderSuggestBox(true);
    navigate("/products")
}

  let cartLength = 0;
  let cartPrice = 0;
  if(!cart){

  }
  else{
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        cartLength = cartLength + product.quantity ;
        cartPrice =  cartPrice + product.sell_price * product.quantity;
    }
  }

  const handleColorChange = (color, logo) => {
    const getStarting = JSON.parse(localStorage.getItem('starting'));
    localStorage.setItem('starting', JSON.stringify({...getStarting,  primaryColor:color, logo: logo }));


    // this code use, just render my dom and change real time web ui color
    handleSearch("");
    setHeaderSearchText( "");
  }

  let searchProductsBold = [];
  displayProducts?.map(item => searchProductsBold.push(item?.name?.split(headerSearchText)))
  
  
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
        <div className="tmp10-top-header print-d-none">
            <Navbar collapseOnSelect expand="lg"  variant="dark">
                <Container>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav as={Link} to="/">
                      <div style={{width: '300px'}} onClick={handleClearAllProductsPage}>
                          {   getStarting.logo ?
                              <div style={{maxWidth: '200px'}}>
                                  <img src={getStarting?.logo} className="w-75" alt="" />
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
                            <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search Your Products..."/>
                            <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '90px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                              <FontAwesomeIcon icon={faTimes}/>
                            </span>
                            <Link to="/products">
                                <button onClick={()=> handleSearchClick(headerSearchText)} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`, color: '#fff'}}><FontAwesomeIcon icon={faSearch}/></button>
                            </Link>
                            {   
                                headerSearchText.length > 0 ?
                                <div className="tmp10-suggestSearch" style={{padding: displayProducts?.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
                                    {/* {
                                        displayProducts?.map(product => <div key={product._id}>
                                            <Link to="/products">
                                                <button onClick={()=> suggestClick(product.name)} className="suggest-search-btn"><span className="tmp10-search-text-line-climb">{product.name}</span></button>
                                            </Link>
                                        </div>)
                                    } */}
                                    <div>
                                        {
                                          searchProductsBold?.map((item, index) => (
                                            <button type="button" key={index} className="suggest-search-btn" onClick={(e)=> suggestClick(item.join(headerSearchText))}>
                                                {
                                                  item?.map( (second, i) => (
                                                    <span ke={i}>{second && <span>{second}</span>}<strong>{ (i !== item?.length - 1 ) ? headerSearchText : null}</strong></span>
                                                ))}
                                                <br />
                                            </button>
                                          ))
                                        }
                                    </div>
                                </div>
                                :
                                ''
                            }
                        </form>
                    </Nav>
                    <Nav>
                    <Navbar.Brand>
                        <Nav className="tmp10-header-icon-container">
                          {/* <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#3B5998', color: '#fff'}}><FontAwesomeIcon icon={faFacebookF}/></div></Nav.Link>
                          <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#26A6D1', color: '#fff'}}><FontAwesomeIcon icon={faTwitter}/></div></Nav.Link>
                          <Nav.Link href="https://www.facebook.com/" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: '#3F729B', color: '#fff'}}><FontAwesomeIcon icon={faInstagram}/></div></Nav.Link> */}
                          <Nav.Link href="callto: ++8809609414141" target="_blank"><div className="tmp10-header-icon" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faHeadset}/></div></Nav.Link>
                        </Nav>
                    </Navbar.Brand>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

        <div className="tmp10-header print-d-none" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
                <Nav onClick={handleClearAllProductsPage}>
                  <Nav.Link as={Link} to="/" style={{marginRight: '20px'}}>Home</Nav.Link>
                  <Nav.Link as={Link} to="/products" style={{marginRight: '20px'}} onClick={handleClearAllProductsPage}>Products</Nav.Link>
                  <Nav.Link as={Link} to="/about" style={{marginRight: '20px'}}>About</Nav.Link>
                  <Nav.Link as={Link} to="/contact" style={{marginRight: '20px'}}>Contact</Nav.Link>
                  {
                      (user?.email || user?.phoneNumber)?
                      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                      :
                      ''
                  } 
                </Nav>
                <Nav>
                  <div style={{margin: 'auto'}}>
                      {   (user?.email || user?.phoneNumber) ?
                        <div className="d-flex align-items-center">
                          <p style={{margin: "0px 10px 0px 0px"}}>Hello <span style={{color: "#000"}}>{user?.displayName ? user?.displayName : "User"}</span></p>
                          <Link to="/login" onClick={logOut}><span style={{color: '#fff'}}>LogOut <FontAwesomeIcon icon={faSignOutAlt}/></span></Link>
                        </div>
                        :
                        <>
                          <Link to="/login"><span style={{color: '#fff'}}>Login</span></Link>
                          <span> / </span>
                          <Link to="/register"><span style={{color: '#fff'}}>Register</span></Link>
                        </>
                      }  
                  </div>
                  <Nav.Link>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        ✍
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {/* <p onClick={() => handleColorChange("#ff3030")} style={{backgroundColor: "#ff3030"}}></p>
                        <p onClick={() => handleColorChange("#009688")} style={{backgroundColor: "#009688"}}></p>
                        <p onClick={() => handleColorChange("#f57224")} style={{backgroundColor: "#f57224"}}></p>
                        <p onClick={() => handleColorChange("#2196F3")} style={{backgroundColor: "#2196F3"}}></p>
                        <p onClick={() => handleColorChange("#32CD32")} style={{backgroundColor: "#32CD32"}}></p>
                        <p onClick={() => handleColorChange("#2948ff")} style={{backgroundColor: "#2948ff"}}></p> */}
                        {
                          websiteColor?.map((color, i) => <p key={i} onClick={() => handleColorChange(color.color, color.logo)} style={{backgroundColor: color.color}}></p>)
                        }
                      </Dropdown.Menu>
                    </Dropdown>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/cart" style={{margin: '0px 10px'}}><span className="tmp10-header-cart"><FontAwesomeIcon icon={faCartPlus} /><span>{cart?.length === 0 ? 0 : cart?.length}</span></span></Nav.Link>
                </Nav>
            </Container>
          </Navbar>
        </div>
      </div>
      <MobileHeader/>
      <MobileFooter/>
    </>

  );
};

export default Header;


