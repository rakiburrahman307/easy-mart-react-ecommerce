import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductsTimeCounter from '../../../Shared/ProductsTimeCounter/ProductsTimeCounter';
import useAuth from '../../../hooks/useAuth';
import './Offer.css';
import OfferSummery from './OfferSummery';

const Offer = () => {
    const {superOffer, getStarting, handleClearWithoutSuperOffer} = useAuth();
    const hoursMinSecs = {days: 5, hours:0, minutes: 0, seconds: 10};

    const navigate = useNavigate()
    const handleSuperOffer = () =>{
        handleClearWithoutSuperOffer();
        navigate('/products');
    }

    return (
        <div>
           {    superOffer.length === 0 ?
                <Container 
                    style={{height: "400px", color: `${getStarting?.primaryColor}`}}
                    className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border"/>
                </Container>
                :
                <Container>
                    <div className="easy-mart-offers-container">
                            <div className="easy-mart-offers-title" style={{borderBottom: '1px solid #eaeaea', marginBottom: '10px', paddingBottom: "3px"}}>
                                <div className="d-flex align-items-center">
                                    <img src="https://i.ibb.co/zrjgGsM/super-deal.png" className="w-100" alt="" />
                                    <ProductsTimeCounter hoursMinSecs={hoursMinSecs}/>
                                </div>
                                {/* <Link to="/products">
                                    <button className="easy-mart-offers-btn">More All</button>
                                </Link> */}
                                <button onClick={handleSuperOffer} className="easy-mart-offers-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>More All</button>
                            </div>
                            <div className="easy-mart-offers">
                                {
                                    superOffer?.slice(0, 6).map( product => <OfferSummery product={product} key={product._id}></OfferSummery>)
                                }
                            </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default Offer;


// #ff4747