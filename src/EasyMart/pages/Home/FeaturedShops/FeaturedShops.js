import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './FeaturedShops.css';
import { Link } from 'react-router-dom';
import categoriesImage from '../../../images/categories.jpg';
import {useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const FeaturedShops = () => {
    const {  getStarting, vendors, handleAllVendors, handleClearAllProductsPage} = useAuth();
    const navigate = useNavigate();

    const handleVendorsDetails = (id) => {
        navigate(`/products/vendors/${id}`);
    }
    
    useEffect(() => {
        handleAllVendors()
    }, [])

    return (
        <>  
            {
                vendors?.length === 0 ?
                ''
                :
                <Container>
                    <div className="easy-mart-featured-container">
                        <div className="d-flex align-items-center justify-content-between py-1" style={{backgroundColor: `${getStarting?.primaryColor}`, marginTop: '30px'}}>
                            <h2>FEATURED SHOPS</h2>
                            <Link to="/products" onClick={handleClearAllProductsPage}>
                                <button style={{color: `${getStarting?.primaryColor}`}} className="more-btn">More All</button>
                            </Link>
                        </div>
                        <br />
                        <div className='easy-mart-featured-list'>
                            {   
                                vendors?.map((data, i) => <div className="easy-mart-featured" key={i}>
                                <div className="d-flex align-items-center" style={{height: '60px', width: '60px'}}>
                                    <img src={data?.logo_url ? data?.logo_url : categoriesImage} style={{width: '100%'}} alt="" />
                                </div>
                                <div style={{marginLeft: '20px'}}>
                                    <h6>{data.name}</h6>
                                    <button onClick={() => handleVendorsDetails(data.name)} >VISIT SHOP</button>
                                </div>
                            </div>)
                            }       
                        </div>
                    </div>
                </Container>
            }
        </>
    );
};

export default FeaturedShops;