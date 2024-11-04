import React, { useEffect, useState } from 'react';
import { Button, Container, Nav, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProductsVendors.css';
import ImageLoader from '../../Shared/ImageLoader/ImageLoader';
import blankImage from '../../images/blunk-image.png';
import categoriesImage from '../../images/categories.jpg'
import useAuth from '../../hooks/useAuth';


const ProductsVendors = () => {
    const {getStarting, handleAddToCart, handleAllVendors, vendors, handleClearAllProductsPage, products} = useAuth();
    const {vendorsName} = useParams();
    const [vendorsNameLogo, setVendorsNameLogo] = useState({});
    const [vendorsData, setVendorsData] = useState([]);
    const [searchVendorsData, setSearchVendorsData] = useState([]);
    
    const navigate = useNavigate();
    const handleProduct = (slug) => {
        navigate(`/product/${slug}`)
    }

    useEffect( () => {
        handleAllVendors();
    }, [])

    useEffect( () => {
        if(!vendorsName) return;
        const findNameLogo = vendors?.find(data => data.name === vendorsName)
        setVendorsNameLogo(findNameLogo);

        const filterVendorsProducts = products?.filter(data => data.vendors_name === vendorsName)
        setVendorsData(filterVendorsProducts);
        setSearchVendorsData(filterVendorsProducts)

    }, [ vendorsName, vendors, products])

    const handleVendorsDataChange = e =>{
        const searchData = e.target.value;
        const matchedProducts = searchVendorsData.filter(product => product.name.toLowerCase().includes(searchData.toLowerCase()));
        setVendorsData(matchedProducts);
    }

    return (
        <div className="pb-5 pt-3">
            <Container>
                <div style={{backgroundColor: '#fff', height: '200px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div>
                        <div style={{width: '100px', margin: '0 auto'}}>
                            <img src={vendorsNameLogo?.logo_url ? vendorsNameLogo?.logo_url : categoriesImage} style={{width: '100%'}}alt="" />
                        </div>
                        <h4 className="text-center">{vendorsNameLogo?.name || "Vendor Name"}</h4>
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h2>{vendorsNameLogo?.name || "Vendor Name"} <span style={{color: `${getStarting?.primaryColor}`}}>{vendorsData.length}</span> Products</h2>
                        <div className="vendors-search">
                            <input onChange={handleVendorsDataChange} type="text" placeholder="Search..."/>
                        </div>
                        <Link to="/products" onClick={handleClearAllProductsPage}>
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none', marginBottom: '20px'}}><FontAwesomeIcon icon={faEye} />  All Products</Button>
                        </Link>
                    </div>
                {
                    vendorsData?.length === 0 ?
                            <div style={{ color: `${getStarting.primaryColor}`, height: '100vh', margin: '50px 0', textAlign: 'center'}}>
                                {/* <Spinner animation="border" /> */}
                                
                            </div>
                        :
                        <div className="easy-mart-vendors-container">
                            {
                                vendorsData?.slice(0, 10).map(product => <div key={product._id}>
                                    <div className="tmp-vendors-summery">
                                        <div className="tmp-vendors-summery-image">
                                            <div className="image">
                                                <ImageLoader
                                                    url={product.thumbnail}
                                                    thumb={blankImage}
                                                />
                                            </div>
                                            <div className="hover-box">
                                                <ul>
                                                    <li style={{backgroundColor: `${getStarting?.primaryColor}`}}><button onClick={() => handleProduct(product.slug)}><FontAwesomeIcon icon={faEye} /></button></li>
                                                    <li style={{backgroundColor: `${getStarting?.primaryColor}`}}><button onClick={() => handleAddToCart(product)}><FontAwesomeIcon icon={faHeart} /></button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <h5>{product.name}</h5>
                                            <p>{getStarting?.currency} {product.sell_price}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                    </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default ProductsVendors;