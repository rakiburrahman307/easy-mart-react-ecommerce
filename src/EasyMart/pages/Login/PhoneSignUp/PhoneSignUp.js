import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button, Container } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import useAuth from "../../../hooks/useAuth";

import './PhoneSignUp.css';

const PhoneSignUp = () => {
  document.title = "Phone Login";

  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState("");
  const { setUpRecaptcha, getStarting } = useAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptcha(number, name);
      setResult(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
      <Container>
             <>
                <style type="text/css">
                    {
                        `.tmp-OTP-container form input[type="text"], .tmp-OTP-container form input[type=otp]{
                              border: 2px solid ${getStarting?.primaryColor};
                        }
                        .tmp-OTP-container form input[type=tel]{
                              border: none;
                              box-shadow: none;
                        }
                        .tmp-OTP-container .PhoneInput{
                              border: 2px solid ${getStarting?.primaryColor};
                              padding-left: 10px;
                              border-radius: 6px;
                        }
                        .tmp-OTP-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 1px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>

            <div className="p-4 box tmp-OTP-container">
                  <h3 className="pb-3 text-center" style={{color: `${getStarting?.primaryColor}`}}>Please enter the one time password to verify your account</h3>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
                        <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Your Name"/>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                              <PhoneInput
                                    defaultCountry="BD"
                                    value={number}
                                    onChange={setNumber}
                                    placeholder="Enter Phone Number"
                              />
                              <div id="recaptcha-container" style={{textAlign: "center", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "10px", width: "100%"}}></div>
                        </Form.Group>
                        <div className="button-right">
                              <Link to="/login">
                                    <Button variant="secondary">Cancel</Button>
                              </Link>
                              &nbsp;
                              <Button type="submit" variant="primary" style={{backgroundColor: getStarting?.primaryColor, borderColor: getStarting?.primaryColor}}>
                                    Send Otp
                              </Button>
                        </div>
                  </Form>

                  <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
                        <Form.Group className="mb-3" controlId="formBasicOtp">
                              <Form.Control
                                    type="otp"
                                    placeholder="Enter OTP"
                                    onChange={(e) => setOtp(e.target.value)}
                              />
                              </Form.Group>
                        <div className="button-right">
                              <Link to="/">
                                    <Button variant="secondary">Cancel</Button>
                              </Link>
                              &nbsp;
                              <Button type="submit" variant="primary" style={{backgroundColor: getStarting?.primaryColor, borderColor: getStarting?.primaryColor}}>
                                    Verify
                              </Button>
                        </div>
                  </Form>
            </div>
      </Container>
  );
};

export default PhoneSignUp;
