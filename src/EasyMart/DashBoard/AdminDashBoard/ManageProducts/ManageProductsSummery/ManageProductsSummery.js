import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ImageLoader from '../../../../Shared/ImageLoader/ImageLoader';
import useAuth from '../../../../hooks/useAuth';
import ManageProductEdit from '../ManageProductEdit/ManageProductEdit';
import './ManageProductsSummery.css';
import getBaseUrl from '../../../../hooks/getBaseUrl';

const ManageProductsSummery = (props) => {
    const {thumbnail, name, slug, product_code, sell_price, discount, cate_name, _id} = props.product;
    const { getStarting, products, setProducts } = useAuth();
    const [editModalShow, setEditModalShow] = React.useState(false);
    const [product, setProduct] = useState({});

    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`);
    }

    const offer = ( sell_price * discount ) / 100;
    const offerPrice = sell_price + offer;

    const handleProductsDelete = ( cateName, id ) => {
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
                    const url = `${getBaseUrl()}/product/delete/${cateName}/${id}`;
                    fetch(url, {
                        method: 'PUT'
                    })
                    .then(res => res.json())
                    .then( data => {
                        if(data.modifiedCount > 0 || data.acknowledged === true){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Products Deleted Successfully',
                                showConfirmButton: false,
                                timer: 2000
                            })
                            const remaining = products?.filter(pd => pd._id !== id);
                            setProducts(remaining)
                        }
                    })

                }
          })

        // alert(id)
    }

    const handleEditModal = (id) => {
        setEditModalShow(true);
        const newProduct = products?.find(pd => pd._id === id);
        setProduct(newProduct);
    }
   
    return (
        <>  
            <div className="easy-mart-manage-products-summery-container">
                <div className="easy-mart-manage-products-summery-image" onClick={handleProductDetails}>
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
                        <p>{getStarting?.currency}{sell_price}</p> &nbsp;&nbsp;
                        {   discount > 0 && 
                            <h6 className="hot"><span>{discount}%</span></h6>
                        }
                    </div>
                    <div>
                        <button onClick={() => handleEditModal(_id)} className="easy-mart-manage-products-summery-btn" style={{ backgroundColor: `${getStarting?.primaryColor}`, color: "#fff"}}>Edit</button>
                        <button onClick={() => handleProductsDelete(cate_name, _id)} className="easy-mart-manage-products-summery-btn" style={{ backgroundColor: "#ff3030", color: "#fff"}}>Delete</button>
                    </div>
                </div>
            </div>

            <ManageProductEdit
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                product={product}
            />
        </>
    );
};

export default ManageProductsSummery;