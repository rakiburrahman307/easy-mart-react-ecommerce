import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ProductsDetailsSummery from './ProductsDetailsSummery/ProductsDetailsSummery';


const ProductsDetails = () => {
    document.title = "Product"

    const navigate = useNavigate();
    const {productSlug} = useParams();
    const [product, setProduct] = useState({});
    const { getStarting, products } = useAuth();

    useEffect( () => {
        const newProduct = products?.find(pd => pd.slug === productSlug);
        setProduct(newProduct);
    }, [products, productSlug])

    return (
        <div>
            <Container>
                {   ( product?.length === 0 || product === undefined) ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '250px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                    :
                    <div style={{padding: '40px 0px'}}>
                        <ProductsDetailsSummery product={product} productSlug={productSlug}></ProductsDetailsSummery>
                    </div>
                }
            </Container>
        </div>
    );
};

export default ProductsDetails;