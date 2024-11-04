import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import './ManageProducts.css';
import ManageProductsSummery from './ManageProductsSummery/ManageProductsSummery';

const ManageProducts = () => {
    const {products, vendorUser, getStarting} = useAuth();
    const [manageProducts, setManageProducts] = useState();
    const [manageSearchText, setManageSearchText] = useState("");

    const handleProductSearch = e =>{
        const searchData = e.target.value;
        setManageSearchText(searchData);
        if(vendorUser?.vendor){
            const filterVendorsProducts = products?.filter(data => data.vendors_name === vendorUser?.vendors_name);
            const matchedProducts = filterVendorsProducts.filter(product => product.name.toLowerCase().includes(searchData.toLowerCase()));
            setManageProducts(matchedProducts);
        }
        else{
            const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchData.toLowerCase()));
            setManageProducts(matchedProducts);
        }
    }

    useEffect(() => {
        if(!manageSearchText){
            if(vendorUser?.vendor){
                const filterVendorsProducts = products?.filter(data => data.vendors_name === vendorUser?.vendors_name);
                setManageProducts(filterVendorsProducts);
            }
            else{
                setManageProducts(products);
            }
        }
    }, [manageSearchText, products, vendorUser])

  

    return (
        <div>
            <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Manage Products ({manageProducts?.length})</h2>
            <div className="manage-products-search text-center">
                <input onChange={handleProductSearch} type="search" placeholder="Search..."/>
            </div>
           {    manageProducts?.length === 0 ?
                <Container 
                    style={{height: "400px", color: `${getStarting?.primaryColor}`}}
                    className="d-flex align-items-center justify-content-center">
                    <Spinner animation="border"/>
                </Container>
                :
                <Container>
                    <div className="easy-mart-manage-products">
                        {
                              manageProducts?.slice(0)?.reverse()?.map( product => <ManageProductsSummery product={product} key={product._id}></ManageProductsSummery>)
                        }
                    </div>
                </Container>
            }
        </div>
    );
};

export default ManageProducts;


