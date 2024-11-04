import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './TodayProducts.css';
import PopularProductsSummery from './TodayProductSummery';


const TodayProducts = () => {
    const { superOffer, getStarting, handleClearWithoutSuperOffer } = useAuth();

    const navigate = useNavigate()
    const handleSuperOffer = () =>{
        handleClearWithoutSuperOffer();
        navigate('/products');
    }
    return (
        <div className="easy-mart-today-products">
            <Container>
                <div className="d-flex align-items-center justify-content-between py-1" style={{backgroundColor: `${getStarting?.primaryColor}`, marginTop: '30px'}}>
                    <h2>TODAY'S DEALS</h2>
                    <Link to="/products">
                        <Button onClick={handleSuperOffer} style={{backgroundColor: '#fff', color: `${getStarting?.primaryColor}`, border: 'none', padding: '5px 20px', marginRight: '20px'}}>More All</Button>
                    </Link>
                </div>
                <br />
               { 
                    superOffer?.length === 0 ?
                    <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                        <Spinner animation="border" />
                    </div>
                    :
                    <div className="easy-mart-today-products-container">
                        {   
                            superOffer?.slice(-6)?.map( product => <PopularProductsSummery product={product} key={product._id}></PopularProductsSummery>)
                        }
                    </div>
                }
            </Container>
        </div>
    );
};

export default TodayProducts;