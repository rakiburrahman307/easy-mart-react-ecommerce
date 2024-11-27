import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import useAuth from '../../../hooks/useAuth';
import './AddProducts.css';

const AddProducts = () => {
    document.title = 'Add Products';
    const navigate = useNavigate(); 
    const { register, handleSubmit, reset } = useForm();
    const {  getStarting, categoriesProducts, products, setProducts, brands, handleAllBrands, vendorUser } = useAuth();

    const [fileList, setFileList] = useState([]);
    const [imageUpload, setImageUpload] = useState(false);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setImageUpload(true);
    };

    const multipleThumbUrl = []
    for(const image of fileList){
        multipleThumbUrl.push(image?.thumbUrl)
    }

    const onSubmit = data => {
      const categoriesPd = categoriesProducts?.find(category => category.cate_name === data.cate_name);
      const randomIdCreate = (Math.random() + 1).toString(36).substring(7) + Math.floor(Math.random() * 900834000) + (Math.random() + 1).toString(36).substring(7) + 10045362700 + (Math.random() + 1).toString(36).substring(7);
      let productsObject = {
            "_id": randomIdCreate,
            "name": data.name,
            "product_code": data.product_code,
            "bar_code": data.bar_code,
            "sell_price": parseInt(data.sell_price),
            "discount": parseInt(data.discount),
            "stock": parseInt(data.stock),
            "superOffer": data.discount > 0 ?  true : false,
            "slug": `${data.name.replace(/\s/g, '-')}-${data.cate_name.replace(/\s/g, '-')}`,
            "thumbnail": data.thumbnail,
            // "thumbUrl": [...multipleThumbUrl],
            "rating": { score: 0, total: 0 },
            "brand_name": data.brand_name
      }

        let addData
        if(vendorUser?.vendor){
            addData = {...productsObject, "vendors_name": vendorUser.vendors_name}
        }
        else{
            addData = productsObject;
        }

        fetch(`https://easymartbackend.vercel.app/product/add/${categoriesPd?.cate_name}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(addData)
        })
        .then(res => res.json())
        .then(result => {
            if(result.modifiedCount > 0){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Product Added Successfully',
                    showConfirmButton: false,
                    timer: 2000
                })
                reset();
                navigate("/products");
            }
            setProducts([...products, addData])
        })
        .catch((error) => {
            console.log(error)
        });
    };

    useEffect(() => {
        handleAllBrands()
    }, [])

    useEffect( () => {
        if(imageUpload){
            setTimeout(() => {
                setFileList([...fileList])
                setImageUpload(false)
            }, 3000);
        }
    }, [fileList])

    

    return (
      <>
            <>
                <style type="text/css">
                    {
                        `
                        .easy-mart-add-products input{
                            border: 1px solid ${getStarting?.primaryColor};
                            color: ${getStarting?.primaryColor};
                        }
                        .easy-mart-add-products select{
                            border: 1px solid ${getStarting?.primaryColor};
                        }
                        .easy-mart-add-products input:active{
                            border: 1px solid ${getStarting?.primaryColor};
                        }
                        .easy-mart-add-products input:hover{
                            border: 1px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `
                    }
                </style>
            </>
            <div className="container">
                  <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Add New Products</h2>
                  <div className="easy-mart-add-products">
                  <form onSubmit={handleSubmit(onSubmit)} className="text-center">
                        <select {...register("cate_name")}>
                              <option value="categories" style={{display: "none"}}>Select Categories</option>
                              {
                                    categoriesProducts?.map((categories, i) => (
                                        <option key={i} value={categories?.cate_name}>{categories?.cate_name}</option>
                                    ))
                              }
                        </select>
                        <br />
                        <select {...register("brand_name")}>
                              <option value="brands" style={{display: "none"}}>Select Brands</option>
                              {
                                    brands?.map((brand, i) => (
                                        <option key={i} value={brand?.name}>{brand?.name}</option>
                                    ))
                              }
                        </select>
                        <br />
                        <input placeholder="Please Type Products Name" {...register("name")} required/>
                        <input type="number" placeholder="Please Type Product Code" {...register("product_code")} required/>
                        <input placeholder="Please Type Bar Code" {...register("bar_code")} required/>
                        <input type="number" placeholder="Please Type Sell Price" {...register("sell_price")} required/>
                        <input type="number" placeholder="Please Type Discount" {...register("discount")} required/>
                        <input type="number" placeholder="Please Type Total Stock" {...register("stock")} required/>
                        {/* <input placeholder="Please Type Km" {...register("superOffer")} required/> */}
                        {/* <input placeholder="Please Type Manual" {...register("slug")} required/> */}
                        <input placeholder="Please Type Image Link" {...register("thumbnail")} required/>
                        <ImgCrop grid rotate>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                            >
                                {fileList.length < 3 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                        <input type="submit" className="btn w-75 text-white"  style={{backgroundColor: getStarting?.primaryColor}}/>
                  </form>
                  </div>
            </div>
      </>
    );
};

export default AddProducts;