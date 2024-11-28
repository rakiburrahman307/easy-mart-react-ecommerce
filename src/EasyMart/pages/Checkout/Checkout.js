import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import useAuth from "../../hooks/useAuth";
import "./Checkout.css";
import CheckoutSummery from "./CheckoutSummery/CheckoutSummery";
import PaymentMethod from "./PaymentMethod/PaymentMethod";
import getBaseUrl from "../../hooks/getBaseUrl";

const getFromLocalStorage = () => {
  const cartList = localStorage.getItem("shopping_cart");
  if (cartList) {
    return JSON.parse(localStorage.getItem("shopping_cart"));
  } else {
    return [];
  }
};

const Checkout = () => {
  document.title = "Checkout";

  const navigate = useNavigate();
  const {
    cart,
    setCart,
    user,
    getStarting,
    totalOrder,
    userOrder,
    setUserOrder,
    handleProductOrders,
    vendorUser,
  } = useAuth();

  const [couponValue, setCouponValue] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponValid, setCouponValid] = useState(true);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const [shoppingCart] = useState(getFromLocalStorage());
  const [pageNumber, setPageNumber] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    handleProductOrders();
    getCouponData();
  }, []);

  const handleNextButton = () => {
    if (pageNumber < 3) {
      setPageNumber(pageNumber + 1);
    }
    if (paymentMethod) {
      alert("Payment Success");
    }
  };
  const handleBackButton = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setPaymentMethod("");
    } else {
      setPageNumber(1);
    }
  };

  let cartLength = 0;
  let cartPrice = 0;
  if (!cart) {
  } else {
    for (const product of cart) {
      if (!product.quantity) {
        product.quantity = 1;
      }
      cartLength = cartLength + product.quantity;
      cartPrice = cartPrice + product.sell_price * product.quantity;
    }
  }

  console.log(discountPercentage);
  let couponText = coupon;
  const handleCoupon = (couponValue, couponText, cartPrice) => {
    if (couponValue) {
      if (couponValue.toLowerCase() === couponText.toLowerCase()) {
        console.log("value" + couponValue, "text" + couponText);
        const offer = (cartPrice * discountPercentage) / 100;
        console.log(offer);
        setDiscountPrice(cartPrice - offer);
        setDiscount(offer);
        setCouponValid(true);
        setCouponApplied(true);
        toast.success("Coupon Match successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
      } else {
        setCouponValid(false);
      }
    }
    setCouponValue("");
  };

  let newTotalPrice;
  if (discount === 0) {
    newTotalPrice = cartPrice;
  } else {
    newTotalPrice = discountPrice;
  }

  const onSubmit = (data) => {
    let products = [];
    shoppingCart.map((cart) =>
      products.push({
        prod_id: cart._id,
        prod_name: cart.name,
        prod_quantity: cart.quantity,
        prod_price: cart?.sell_price,
        color_code: cart.color_id,
      })
    );

    data.invoice = 4000 + totalOrder?.length;
    data.products = products;
    data.payment_amount = newTotalPrice + 100; // 100 means delivery charge
    data.discount = discount;
    data.payment_method = paymentMethod;
    data.order_date_time = new Date().toLocaleString();
    data.order_date = new Date().toDateString();
    data.order_status = 1;
    if (vendorUser?.vendors_name) {
      data.vendors_name = vendorUser?.vendors_name;
      data.vendorUser = true;
    }

    fetch(`${getBaseUrl()}/orders`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Submitted Order",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
          setUserOrder([...userOrder, data]);
        }
      });

    localStorage.removeItem("shopping_cart");
    setCart([]);
  };

  const handleBkash = () => {
    let products = [];
    shoppingCart.map((cart) =>
      products.push({
        prod_id: cart._id,
        prod_name: cart.name,
        prod_quantity: cart.quantity,
        prod_price: cart?.sell_price,
        color_code: cart.color_id,
      })
    );

    const details = {
      userName: user?.displayName,
      userEmail: user?.email,
      products: products,
      payment_amount: newTotalPrice + 100,
      discount: discount,
      invoice: 4000 + totalOrder?.length,
    };
    fetch(`${getBaseUrl()}/bkash-checkout`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.replace(res?.bkashURL);
        // window.open(res?.bkashURL, "_blank");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCouponData = async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/coupon`);
      const data = await response.json();
      if (data) {
        setCoupon(data?.code);
        setCouponValid(data?.isActive);
        setDiscountPercentage(data?.discountPercentage);
      }
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  };
  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center", margin: "10px 0px" }}>Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='tmp-checkout-payment-container'>
            <div className='checkout-top-toggle-section'>
              <div className='checkout-top-toggle'>
                <div>
                  <h6
                    style={{
                      backgroundColor:
                        (pageNumber === 1) |
                        (pageNumber === 2) |
                        (pageNumber === 3)
                          ? getStarting?.primaryColor
                          : "#00000061",
                    }}
                  >
                    {pageNumber === 1 && "1"}
                    {pageNumber > 1 && "✔"}
                  </h6>
                </div>
                <p>Checkout Summary</p>
                <hr />
              </div>
              <div className='checkout-top-toggle'>
                <div>
                  <h6
                    style={{
                      backgroundColor:
                        (pageNumber === 2) | (pageNumber === 3)
                          ? getStarting?.primaryColor
                          : "#00000061",
                    }}
                  >
                    {pageNumber < 3 && "2"}
                    {pageNumber > 2 && "✔"}
                  </h6>
                </div>
                <p>Shipping address</p>
                <hr />
              </div>
              <div className='checkout-top-toggle'>
                <div>
                  <h6
                    style={{
                      backgroundColor:
                        pageNumber === 3
                          ? getStarting?.primaryColor
                          : "#00000061",
                    }}
                  >
                    3
                  </h6>
                </div>
                <p>Payment details</p>
              </div>
            </div>

            {pageNumber === 1 && (
              <CheckoutSummery
                cartPrice={cartPrice}
                discount={discount}
                newTotalPrice={newTotalPrice}
                couponText={couponText}
                couponValue={couponValue}
                couponValid={couponValid}
                couponApplied={couponApplied}
                setCouponValue={setCouponValue}
                handleCoupon={handleCoupon}
              />
            )}
            {pageNumber === 2 && (
              <div className='tmp-checkout-shipping-container'>
                <h2>Shipping Address</h2>
                <input
                  placeholder='Receiver Name *'
                  defaultValue={user?.displayName}
                  {...register("receiver_name", { required: true })}
                  style={{ borderColor: getStarting?.primaryColor }}
                />
                <input
                  placeholder='Receiver Number *'
                  defaultValue={user?.email}
                  {...register("receiver_email", { required: true })}
                  style={{ borderColor: getStarting?.primaryColor }}
                />
                <input
                  placeholder='Receiver Number *'
                  defaultValue={user?.phoneNumber}
                  {...register("receiver_phone", { required: true })}
                  style={{ borderColor: getStarting?.primaryColor }}
                />
                <input
                  placeholder='Receiver Address *'
                  {...register("receiver_location", { required: true })}
                  style={{ borderColor: getStarting?.primaryColor }}
                />
                <textarea
                  placeholder='Orders notes (Optional)'
                  {...register("others", { required: true })}
                  style={{
                    height: "150px",
                    borderColor: getStarting?.primaryColor,
                  }}
                />
                {/* <input type="submit" value="PLACE ORDER" style={{backgroundColor: `${getStarting?.primaryColor || '#157ed2'}`, border: 'none'}}/> */}
              </div>
            )}
            {pageNumber === 3 && (
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}

            <div className='checkout-next-btn mb-3'>
              <Button
                variant='light'
                onClick={handleBackButton}
                disabled={pageNumber === 1 ? true : false}
              >
                Back
              </Button>
              <Button
                variant='primary'
                className='ms-2'
                onClick={handleNextButton}
                disabled={pageNumber === 3 && !paymentMethod ? true : false}
                style={{
                  backgroundColor: getStarting?.primaryColor,
                  border: "none",
                }}
              >
                {pageNumber === 3 ? "Place Order" : "Next"}
              </Button>
            </div>
          </div>
        </form>
        {pageNumber === 3 && (
          <div className='text-center mb-4'>
            <label htmlFor=''>With Payment gateway</label> &nbsp;
            <button onClick={handleBkash} className='bkash-btn'>
              <img
                src='https://i.ibb.co/9YGfdHR/bikash.png'
                className='w-100'
                alt='bkash'
              />
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Checkout;
