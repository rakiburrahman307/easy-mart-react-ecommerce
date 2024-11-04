import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './CartDetails.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';


const CartDetails = ({ cartShow, handleCartClose, ...props }) => {
    const {handleRemove, handleAddToCart, handleMinusToCart, getStarting} = useAuth();
    return (
        <div>
          <Offcanvas show={cartShow} onHide={handleCartClose} {...props}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title style={{color: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faCartPlus} /> <span>{props.cart.length} Items</span></Offcanvas.Title>
            </Offcanvas.Header>
            <hr />
            <Offcanvas.Body>
              <div style={{height: '100vh', maxHeight: '100vh', overflowY: 'auto'}}>
                  {
                    props.cart?.map(c => <div key={c._id} className="d-flex align-items-center justify-content-between tmp-cart-details-container mb-3">
                        <div className="d-flex align-items-center" style={{width: '300px'}}>
                            <div className="tmp-cart-quantity">
                                <button onClick={() => handleAddToCart(c)}><FontAwesomeIcon icon={faPlus}/></button>
                                <p className="text-center">{c.quantity}</p>
                                <button onClick={() => handleMinusToCart(c)}><FontAwesomeIcon icon={faMinus}/></button>
                            </div>
                            <div className="px-1 mx-2" style={{width: '50px', height: '50px', margin: '0 auto'}}>
                              <img src={c.thumbnail} className="h-100" alt="" />
                            </div>
                            <div>
                              <h5>{c.name}</h5>
                              <p style={{color: `${getStarting?.primaryColor}`}}><strong>{getStarting?.currency}{c.sell_price}</strong></p>
                              <p style={{color: "grey"}}>Quantity: {c.quantity} Pcs</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end pe-1" style={{width: '120px'}}>
                          <div>
                            <h6>{getStarting?.currency}{c.sell_price * c.quantity}</h6>
                          </div>
                          <div className="tmp-cart-cross-btn" style={{color: `${getStarting?.primaryColor}`}}>
                              <FontAwesomeIcon icon={faTimes} onClick={() => handleRemove(c._id)}/>
                          </div>
                        </div>
                        <hr />
                    </div>)
                  }
              </div>
              <div style={{borderTop: '1px solid #f4efef'}}>
                <Link to="/checkout">
                  <Button onClick={handleCartClose} variant="primary" style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none', width: '100%', margin: '20px 0px'}}>Proceed To Checkout</Button>
                </Link>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
      </div>
    );
};

export default CartDetails;