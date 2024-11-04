import { faMinus, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Cart.css';

const Cart = () => {
   
    const {cart, setCart,  handleAddToCart, handleMinusToCart, handleRemove, getStarting, handleClearAllProductsPage} = useAuth();

    let cartLength = 0;
    let cartPrice = 0;
    let offerPrice = 0;
    if(!cart){
 
    }
    else{
     for(const product of cart){
         if(!product.quantity){
             product.quantity = 1;
         }
         cartLength = cartLength + product.quantity ;
         cartPrice =  cartPrice + product.sell_price * product.quantity;
 
         const offer = ( product.sell_price * product.discount ) / 100;
         const discount = product.sell_price - offer;
         offerPrice = offerPrice + discount * product.quantity;
     }
 }  

    // const total = cart.reduce((previous, product) => previous + product.sell_price * product.quantity, 0)
    // const orderTotal = parseFloat(total).toFixed(2);

    // (c.sell_price - (( c.sell_price * c.discount ) / 100)) * c.quantity
    // {parseInt((c.sell_price - (( c.sell_price * c.discount ) / 100)) * c.quantity)}.00

    const handleRemoveALlCArt = () => {
        localStorage.removeItem('shopping_cart');
        setCart([]);
    }

    return (
        <>
            {
                cart?.length === 0 ?
                <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div className="text-center">
                        <h5 style={{ color: `#757575`, margin: '20px 0'}}>There are no items in this cart</h5>
                        <Link to="/products" onClick={handleClearAllProductsPage}>
                            <Button variant="primary" style={{backgroundColor: `${getStarting.primaryColor}`, border: 'none'}}>Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
                :
                <Container>
                    <div className="easy-mart-cart-container">
                        <div>
                            <div className="mx-auto">
                                <Table hover responsive="sm" style={{border: `0.1px solid ${getStarting.primaryColor}`}}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Item</th>
                                            <th>Quantity</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    {
                                        cart?.map(c => <tbody key={c._id}>
                                            <tr>
                                                <td style={{width: "50px", textTransform: 'capitalize'}}>
                                                    <img src={c.thumbnail} width="50px" height="50px" alt="" />
                                                </td>
                                                <td style={{textTransform: 'capitalize'}}>
                                                    <div className="easy-mart-cart-info">
                                                        <span className="d-flex align-items-center name"><strong>Name :</strong> &nbsp; {c.name}</span>
                                                        <span className="d-flex align-items-center"><strong>Code :</strong> &nbsp; {c.product_code}</span>
                                                        <span className="d-flex align-items-center" style={{width: '102px'}}><strong>Price :</strong> &nbsp; {c.sell_price * c.quantity}</span>
                                                        <span className="d-flex align-items-center"><strong>Quantity :</strong> &nbsp; {c.quantity}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="easy-mart-cart-quantity">
                                                        <button onClick={() => handleMinusToCart(c)} className="btn text-white" style={{backgroundColor: c.quantity === 1 ? "#ccc" : getStarting.primaryColor, cursor: c.quantity === 1 ? 'not-allowed' : 'pointer'}}><FontAwesomeIcon icon={faMinus}/></button>
                                                        <p className="text-center" style={{backgroundColor: `${getStarting.primaryColor}99`, color: '#fff'}}>{c.quantity}</p>
                                                        <button onClick={() => handleAddToCart(c)} className="btn text-white" style={{backgroundColor: getStarting.primaryColor}}><FontAwesomeIcon icon={faPlus}/></button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleRemove(c._id)} className="btn text-white" style={{backgroundColor: `${getStarting.primaryColor}`}}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </Table>
                            </div>
                            <div className="pt-3 pb-5">
                                <Link to="/products" onClick={handleClearAllProductsPage}>
                                    <Button variant="primary" className="continue-shopping" style={{backgroundColor: `${getStarting.primaryColor}`, border: 'none'}}>Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="easy-mart-cart-balance">
                            <div style={{width: "300px"}}>
                                <Button variant="primary"
                                    onClick={handleRemoveALlCArt}
                                    style={{backgroundColor: `${getStarting.primaryColor}`, border: 'none', width: '100%', marginBottom: '20px'}}
                                    >
                                        Clear All Cart
                                </Button>

                                <div style={{border: `1px solid ${getStarting.primaryColor}`, padding: "30px",}}>
                                    <h6><strong>Price : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{fontSize: '22px'}}>{getStarting?.currency}</span> {cartPrice}</strong></h6>
                                    {/* <h6>Shipping Fee : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.00</h6> */}
                                    <hr />
                                    <h5>Order Total : <span style={{fontSize: '22px'}}>{getStarting?.currency}</span> {cartPrice}</h5>
                                    <Link to="/checkout">
                                        <Button  variant="primary" style={{backgroundColor: `${getStarting.primaryColor}`, border: 'none', width: '100%'}}>Proceed To Checkout</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            }
        </>
    );
};

export default Cart;

// style={{border: `1px solid ${getStarting.primaryColor}`}}