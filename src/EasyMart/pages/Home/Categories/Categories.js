import React, { useEffect, useState } from 'react';
import './Categories.css';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoriesSummery from './CategoriesSummery';
import useAuth from '../../../hooks/useAuth';

const Categories = () => {
    const { categoriesProducts, handleCategory, getStarting, handleClearWithoutCategories } = useAuth();

    const [newCtProducts, setNewCtProducts] = useState([]);

    useEffect( () => {
        const newCategories = categoriesProducts?.filter(homeCategory => homeCategory.products.length > 6 );
        setNewCtProducts(newCategories);
    }, [categoriesProducts])
    
    
    return (
        <div>
            {
                newCtProducts?.length === 0 ?
                <div style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>
                    <Spinner animation="border" />
                </div>
                :
                <Container>
                    {
                        newCtProducts?.map(category => <div key={category._id} className="easy-mart-categories-container">
                            <div className="d-flex align-items-center justify-content-between py-1" style={{backgroundColor: `${getStarting?.primaryColor}`, marginTop: '30px'}}>
                                <h2>{category.cate_name}</h2>
                                <Link to="/products" onClick={handleClearWithoutCategories}>
                                    <button className="easy-mart-categories-products-btn" style={{color: `${getStarting?.primaryColor}`}}>
                                        <span>More All <div onClick={handleCategory} className="easy-mart-categories-products-btn-inner">{category.cate_name}</div></span> 
                                    </button>
                                </Link>
                            </div>
                            <br />
                            <div className="easy-mart-categories-products">
                                {
                                    category?.products?.slice(0, 6).map( product => <CategoriesSummery product={product} key={product._id}></CategoriesSummery>)
                                }
                            </div>
                    </div>)
                    }
                </Container>
            }
        </div>
    );
};

export default Categories;

