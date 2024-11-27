import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import "./PaymentMethod.css";

const PaymentModal = (props) => {
  const navigate = useNavigate();
  const { getStarting } = useAuth();
  const [paymentValue, setPaymentValue] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    if (paymentValue) {
      toast.success("Payment successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
      setPaymentValue("");
      props.onHide();
      navigate("/dashboard/orders");
    }
  };
  const modalInput = {
    border: `1px solid ${getStarting.primaryColor}`,
    width: "100%",
    padding: " 10px",
    marginBottom: " 20px",
    borderRadius: "5px",
  };
  const modalSubmitButton = {
    background: ` ${getStarting.primaryColor}`,
    color: "#fff",
    width: "100%",
    padding: " 10px",
    border: "none",
    borderRadius: "5px",
  };
  return (
    <Modal
      {...props}
      size='sm'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <span style={{ textTransform: "capitalize" }}>
            {props?.paymentMethod} Payment
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePayment}>
          <input
            value={paymentValue}
            type='text'
            required
            onChange={(e) => setPaymentValue(e.target.value)}
            placeholder='Enter your Number'
            style={modalInput}
          />
          <input value='Place Order' type='submit' style={modalSubmitButton} />
        </form>
      </Modal.Body>
      {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
    </Modal>
  );
};

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const { getStarting } = useAuth();
  const [modalShow, setModalShow] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentMethod = (text) => {
    setModalShow(true);
    setPaymentMethod(text);
  };
  return (
    <div style={{ height: "300px" }} className='d-flex align-items-center'>
      <div className='checkout-payment-container'>
        <div
          className='checkout-payment-method-select'
          onClick={() => handlePaymentMethod("bikash")}
        >
           
          <input
            type='radio'
            id='bikash'
            name='payment_method'
            value='bikash'
            style={{
              accentColor:
                paymentMethod === "bikash" ? getStarting?.primaryColor : null,
            }}
          />
           
          <label
            htmlFor='bikash'
            style={{
              border:
                paymentMethod === "bikash"
                  ? `2px solid ${getStarting?.primaryColor}`
                  : "1px solid #ccc",
            }}
          >
            <img src='https://i.ibb.co/9YGfdHR/bikash.png' alt='' />
          </label>
        </div>
        <div
          className='checkout-payment-method-select'
          onClick={() => handlePaymentMethod("nogod")}
        >
           
          <input
            type='radio'
            id='nogod'
            name='payment_method'
            value='nogod'
            style={{
              accentColor:
                paymentMethod === "nogod" ? getStarting?.primaryColor : null,
            }}
          />
           
          <label
            htmlFor='nogod'
            style={{
              border:
                paymentMethod === "nogod"
                  ? `2px solid ${getStarting?.primaryColor}`
                  : "1px solid #ccc",
            }}
          >
            <img src='https://i.ibb.co/zHqtC7X/nogod.png' alt='' />
          </label>
        </div>
        <div
          className='checkout-payment-method-select'
          onClick={() => handlePaymentMethod("rocket")}
        >
           
          <input
            type='radio'
            id='rocket'
            name='payment_method'
            value='rocket'
            style={{
              accentColor:
                paymentMethod === "rocket" ? getStarting?.primaryColor : null,
            }}
          />
           
          <label
            htmlFor='rocket'
            style={{
              border:
                paymentMethod === "rocket"
                  ? `2px solid ${getStarting?.primaryColor}`
                  : "1px solid #ccc",
            }}
          >
            <img src='https://i.ibb.co/QYhddbq/rocket.png' alt='' />
          </label>
        </div>
      </div>
      <PaymentModal
        show={modalShow}
        paymentMethod={paymentMethod}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default PaymentMethod;
