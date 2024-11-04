import React from 'react';
import { Container, Table } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import "./CheckoutSummery.css";

const CheckoutSummery = ({cartPrice, discount, newTotalPrice, couponText, couponValue, couponValid, couponApplied, setCouponValue, handleCoupon}) => {
      const {cart, getStarting} = useAuth();

      return (
            <div>
                <Container className="tmp-checkout-summery-container">
                    <div>
                        <div className="mx-auto">
                        {
                            cart?.length === 0 ?
                            <Table hover responsive="sm" style={{border: `none}`}}>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">There are no items in this cart</td>
                                        </tr>
                                    </tbody>
                            </Table>
                            :
                            <Table hover responsive="sm" style={{border: `none}`}}>
                                {
                                    cart?.map(c => <tbody key={c._id}>
                                        <tr>
                                            <td style={{width: "50px", textTransform: 'capitalize'}}>
                                                <img src={c.thumbnail} width="50px" height="50px" alt="" />
                                            </td>
                                            <td style={{textTransform: 'capitalize'}}>
                                                <div className="tmp-cart-info">
                                                    <h6 className="d-flex align-items-center">{c.name}</h6>
                                                    <div className="d-flex align-items-center">
                                                            <span className="d-flex align-items-center" ><strong>Price :</strong> &nbsp; {c.sell_price * c.quantity},&nbsp;&nbsp; </span>
                                                            <span className="d-flex align-items-center"><strong>Quantity :</strong> &nbsp; {c.quantity}</span>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </Table>
                        }
                        </div>
                    </div>
                    <div>
                    <div className="tmp-checkout-summery-right">
                        <div className="summery-right-top">
                              <h3>Checkout Summary</h3>
                              <hr />
                              <div className="summery-info">
                                    <p>Products</p>
                                    <p>৳ {cartPrice}.00</p>
                              </div>
                              <div className="summery-info">
                                    <p>Delivery Charge</p>
                                    <p>৳ 100.00</p>
                              </div>
                              <div className="summery-info">
                                    <p>Discount</p>
                                    <p>৳ {discount === 0 ? "0.00": `${discount}.00`}</p>
                              </div>
                              <div className="summery-info" style={{border: "none"}}>
                                    <strong><p>Total</p></strong>
                                    <strong><p>৳ {parseInt(newTotalPrice + 100)}</p></strong>
                              </div>
                        </div>
                        <div className="summery-right-bottom mt-3">
                              <div className="coupon">
                                    {
                                        !couponApplied ? 
                                        <>
                                            <input value={couponValue} type="text" onChange={(e) => setCouponValue(e.target.value)} placeholder="Coupon-code" style={{border: `1px solid ${getStarting.primaryColor}`}}/>
                                            <button type="button" className="check-btn" onClick={() => handleCoupon(couponValue, couponText, cartPrice)} style={{background: getStarting.primaryColor}}>Check</button>
                                        </>
                                        :
                                        <button type="button" className="check-btn" disabled style={{background: getStarting.primaryColor, width: "100%", opacity: "0.6"}}>Coupon Applied</button>
                                    }
                              </div>
                              {
                                    !couponValid && <p style={{color: "red", margin: "20px 0px 0px"}}>Coupon code is not valid</p>
                              }
                        </div>
                    </div>
                    </div>
                </Container>
            </div>
      );
};

export default CheckoutSummery;