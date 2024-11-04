import React from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';

const ProductsDetailsRatting = ({show, handleClose, handleRatting, rattingValue, rattingErrorMessage, setRattingErrorMessage, productId}) => {
    const { register, handleSubmit, reset } = useForm();
    

    const getStarting = JSON.parse(localStorage.getItem('starting'));
    const userToken = JSON.parse(localStorage.getItem('userToken'));

    const onSubmit = (data) => {
        data.rating = rattingValue;
        fetch(`${process.env.REACT_APP_BASE_URL}api/products/rating/${productId}`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${userToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.error === true || data.message === "Rating already exist" || data.message === "You can't rate this product" || data.message === "jwt malformed"){
                setRattingErrorMessage(data.message);
            }
            else{
                toast.success(`${data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                setRattingErrorMessage('');
            }
        })
        reset();
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Rating and Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    rattingErrorMessage && <p style={{color:'#ff4747'}}>{rattingErrorMessage}</p>
                }
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1">
                        <Rating
                            onClick={handleRatting}
                            ratingValue={rattingValue * 20}
                            showTooltip
                            tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Prefect']}
                        />
                    </div>
                    <br/>
                    <textarea placeholder="Your Comment..."  {...register("comment") } required style={{padding: '10px', color: 'grey', width:'100%', height: '105px', border: `2px solid ${getStarting?.primaryColor}`, outline: 'none'}}/><br/><br/>
                    {/* <input placeholder="Receiver Address *" defaultValue='Image' {...register("images")} /><br/> */}
                    <input type="submit" value="PLACE REVIEW" style={{padding: '10px 30px', borderRadius: '5px', backgroundColor: getStarting?.primaryColor, color: '#fff', border: 'none'}}/>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ProductsDetailsRatting;


// npm i react-simple-star-rating