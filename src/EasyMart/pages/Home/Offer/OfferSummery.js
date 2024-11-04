import React, { useEffect, useState } from 'react';
import './OfferSummery.css';
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import ImageLoader from '../../../Shared/ImageLoader/ImageLoader';

const OfferSummery = (props) => {
    const {thumbnail, name, slug, product_code, sell_price, discount, rating, _id} = props.product;
    const {handleAddToCart, handleMinusToCart, cart, getStarting} = useAuth();
    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`);
        // localStorage.setItem('productId', JSON.stringify(_id))
    }

    
    const offer = ( sell_price * discount ) / 100;
    const offerPrice = sell_price + offer;


    useEffect(() => {
        const isExists = cart.find(cart => cart._id === _id);
        setQuantity(isExists ? isExists.quantity : 0);
    }, [cart, _id])

    return (
        <>  
            <style type="text/css">
                {
                    `
                        .easy-mart-offer-product-btn-1:hover, .easy-mart-offer-product-btn-3:hover{
                            color: #fff !important;
                            background-color: ${getStarting?.primaryColor}99 !important;
                        }
                        .easy-mart-offer-product-btn-2:hover{
                            color: #fff;
                            background-color: ${getStarting?.primaryColor} !important;
                        }
                        .easy-mart-offer-product-btn:hover .easy-mart-offer-product-btn-3{
                            color: #fff !important;
                            background-color: ${getStarting?.primaryColor}99 !important;
                        }
                    
                    `
                }
            </style>
            <div className="easy-mart-offers-summery-container">
                <div className="easy-mart-offers-summery-image" onClick={handleProductDetails}>
                    <div className="image">
                        <ImageLoader
                            url={thumbnail}
                            thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                        />
                    </div>
                </div>
                <div style={{padding: '0px 10px'}}>
                    <title>{name} - {product_code}</title>
                    <h4 onClick={handleProductDetails}>{name}</h4>
                    <div className="d-flex align-items-center" onClick={handleProductDetails}>
                        {/* <p>{getStarting?.currency} {offerPrice.toFixed(0)}</p> &nbsp;&nbsp;&nbsp;&nbsp; */}
                        <p>{getStarting?.currency}{sell_price}</p> &nbsp;&nbsp;
                        <h6 className="hot"><span>{discount}%</span></h6>
                    </div>
                    <div className="d-flex align-items-center">
                        <Rating
                            readonly
                            placeholderRating={rating?.score || 0}
                            emptySymbol={<span style={{color: '#dadada', fontSize: '20px'}}>★</span>}
                            placeholderSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                            fullSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                        />
                        <p style={{marginBottom: '0px', fontSize: '15px', fontWeight: '400', color: '#9e9e9e'}}>&nbsp;({ rating?.total || 0 })</p>
                    </div>
                    <div className="d-flex align-items-center easy-mart-offer-product-btn">
                        <button onClick={() => handleMinusToCart(props.product)} className="easy-mart-offer-product-btn-1" style={{display: quantity < 1 ? 'none' : "", backgroundColor: `${getStarting?.primaryColor}`, color: "#fff"}}><FontAwesomeIcon icon={faMinus}/></button>
                        <button onClick={() => handleAddToCart(props.product)} className="easy-mart-offer-product-btn-2" style={{width: quantity > 0 ? '60%' : '80%', backgroundColor: quantity > 0 ? `${getStarting?.primaryColor}` : "", color: quantity > 0 ? '#fff' : "", margin: quantity > 0 ? '0px -1px 0px -1px' : ""}}>{quantity < 1 ? "Add" : quantity}</button>
                        <button onClick={() => handleAddToCart(props.product)} className='easy-mart-offer-product-btn-3' style={{backgroundColor: quantity > 0 ? `${getStarting?.primaryColor}` : "", color: quantity > 0 ? '#fff' : ""}}><FontAwesomeIcon icon={faPlus}/></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OfferSummery;