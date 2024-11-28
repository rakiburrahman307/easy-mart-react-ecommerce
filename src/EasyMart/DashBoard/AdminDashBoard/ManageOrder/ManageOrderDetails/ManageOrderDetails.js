import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pdf from "react-to-pdf";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

import './ManageOrderDetails.css';
import getBaseUrl from '../../../../hooks/getBaseUrl';

const ManageOrderDetails = () => {
    
    const {orderId} = useParams();
    const navigate = useNavigate();
    const { getStarting, totalOrder, setTotalOrder, handleProductOrders } = useAuth();
    const [orders, setOrders] = useState({});
    const [printButton, setPrintButton] = useState("block");
    const pdfRef = useRef();

    useEffect(() => {
        handleProductOrders();
    }, [])


    const pdfOptions = {
        orientation: 'proratit',
        unit: 'in',
    };

    const handlePdfButton= () => {
        setPrintButton("none");
        toast.success("PDF make successfully!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
        });

        setTimeout(() => {
            setPrintButton("block");
        }, [3000])
    }

    useEffect( () => {
        const newOrder = totalOrder?.find(order => order._id === orderId);
        setOrders(newOrder);
    }, [totalOrder, orderId])

    let orderPrice = 0;
    if(!orders?.products){
        
    }
    else{
        for(const order of  orders?.products){
            if(!order.quantity){
                order.quantity = 1;
            }
            orderPrice =  orderPrice + order.prod_price * order.prod_quantity;
        }
    }  
    const offer = ( orderPrice * 20 ) / 100;
    const totalPrice = (orderPrice - offer);


    const handleDeleteOrder = id => {
        // const proceed = window.confirm('Are you sure, you want to delete?')
        // if(proceed){
            // const url = `${getBaseUrl()}/orders/${id}`;
        //     fetch(url, {
        //         method: 'DELETE'
        //     })
        //     .then(res => res.json())
        //     .then( data => {
        //         if(data.deletedCount > 0){
        //             Swal.fire({
        //                 position: 'center',
        //                 icon: 'success',
        //                 title: 'Order Deleted Successfully',
        //                 showConfirmButton: false,
        //                 timer: 2000
        //             })
        //             const remaining = totalOrder?.filter(order => order._id !== id);
        //             setTotalOrder(remaining)
        //         }
        //     })
        //     }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
          if (result.isConfirmed) {
                    const url = `${getBaseUrl()}/orders/${id}`;
                    fetch(url, {
                        method: 'DELETE'
                    })
                    .then(res => res.json())
                    .then( data => {
                    if(data.deletedCount > 0){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Orders Deleted Successfully',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            const remaining = totalOrder?.filter(order => order._id !== id);
                            setTotalOrder(remaining)
                            navigate("/dashboard/manageorder");
                        }
                    })
                }
          })
    }

    const handleFormattedDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
          .replace(/[\s,]/g, "-")
          .replace(/-+/g, "-");
        return formattedDate;
      };

      const handleWindowPrint = () => {
        document.title = handleFormattedDate() + "-Easy-Mart.pdf";
        window.print();
        document.title = "Easy-Mart"
    }

    return (
        <Container>
            <style type="text/css">
                {
                    `.easy-mart-manage-orders-details .table>:not(:first-child) {
                        border-top-width: 0.1px !important;
                        border-color: ${getStarting?.primaryColor} !important;
                     }`
                }
            </style>
            <div className="easy-mart-manage-orders-details mb-5" ref={pdfRef}>
                <div className="manage-orders-details-top">
                    <div>
                        <div style={{maxWidth: '200px'}}>
                            <img src={ getStarting.logo } className="w-75" alt="" />
                        </div>
                        <p>{getStarting?.companyName}</p>
                        <p>{getStarting?.phone}</p>
                        <p>{getStarting?.email}</p>
                        <p>{getStarting?.address}</p>
                    </div>
                    <div className="text-end">
                        <p><strong>Invoice #{orders?.invoice}</strong></p>
                        <p>{orders?.order_date_time}</p>
                        <p>{orders?.receiver_name}</p>
                        <p>{orders?.receiver_phone}</p>
                        <p>{orders?.receiver_email}</p>
                        <p>{orders?.receiver_location}</p>
                    </div>
                </div>
                <div>
                {
                    orders?.products?.length === 0 ?
                    <div style={{height: "100vh", color: `${getStarting?.primaryColor}`}}
                        className="d-flex align-items-center justify-content-center">
                        <h2>No Any Product Show</h2>
                    </div>
                    :
                    <Table responsive style={{border: `0.1px solid ${getStarting?.primaryColor}`}}>
                        <thead>
                            <tr>
                                <th>SL.NO.</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {
                            orders?.products?.map((item,i) => <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>
                                        <p style={{width: '400px', marginBottom: '0px'}}>{item.prod_name}</p>
                                    </td>
                                    <td>{item.prod_price}</td>
                                    <td>{item.prod_quantity}</td>
                                    <td>{item.prod_price * item.prod_quantity}</td>
                                </tr>
                            </tbody>                           
                        )}
                    </Table>
                }
                </div>
                <div className="manage-orders-details-bottom">
                    <div>
                        
                    </div>
                    <div>
                        <div className="text-end">
                            <p>Total amount: <span style={{fontSize: '15px'}}>{getStarting?.currency} </span>{orderPrice}</p>
                            <p>Delivery Charge: <span style={{fontSize: '15px'}}>{getStarting?.currency} </span>100</p>
                            <p>VAT: <span style={{fontSize: '15px'}}>{getStarting?.currency} </span>0</p>
                            <p>Discount: <span style={{fontSize: '15px'}}>{getStarting?.currency} </span>{( orderPrice * 20 ) / 100}</p>
                            <h4>Grand Total: <span style={{fontSize: '25px'}}>{getStarting?.currency} </span>{totalPrice + 100}</h4>
                        </div>
                        {/* <div>
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Proceed to payment</Button>&nbsp;&nbsp;
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Print</Button>
                        </div> */}
                        <div className="print-d-none" onClick={handlePdfButton} style={{display: printButton === "block" ? "block" : 'none'}}>
                            <Pdf targetRef={pdfRef} options={pdfOptions}  filename={`${handleFormattedDate()}-Easy-Mart.pdf`} x={.5} y={.5} scale={0.8}>
                                {
                                    ({ toPdf }) =><Button onClick={toPdf} style={{backgroundColor: `${getStarting?.primaryColor}`, width: "100%", border: 'none'}}>PDF</Button>
                                }
                            </Pdf>
                        </div>
                        <div className="print-d-none" onClick={handleWindowPrint} style={{display: printButton === "block" ? "block" : 'none', marginTop: "10px"}}>
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, width: "100%", border: 'none'}}>Print</Button>
                        </div>
                        <div className="print-d-none" onClick={() => handleDeleteOrder(orderId)} style={{display: printButton === "block" ? "block" : 'none', marginTop: "10px"}}>
                            <Button style={{backgroundColor: "#ff3030", width: "100%", border: 'none'}}>Delete Order</Button>
                        </div>
                    </div>
                </div>
            </div>
           <div className="my-5 text-center print-d-none">
                <Link to="/dashboard/manageorder">
                    <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Back Total Order</Button>
                </Link>
           </div>
        </Container>
    );
};

export default ManageOrderDetails;
