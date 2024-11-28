import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import "./ManageProductEdit.css";
import getBaseUrl from "../../../../hooks/getBaseUrl";

const ManageProductEdit = (props) => {
  const {
    name,
    product_code,
    stock,
    bar_code,
    sell_price,
    discount,
    slug,
    thumbnail,
    _id,
    cate_name,
    brand_name,
  } = props.product;
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const {
    getStarting,
    products,
    setProducts,
    vendorUser,
    brands,
    handleAllBrands,
  } = useAuth();
  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onSubmit = (data) => {
    let productsObject = {
      _id: data._id,
      name: data.name,
      product_code: data.product_code,
      bar_code: data.bar_code,
      sell_price: parseInt(data.sell_price),
      discount: parseInt(data.discount),
      stock: parseInt(data.stock),
      superOffer: data.discount > 0 ? true : false,
      slug: `${data.name.replace(/\s/g, "-")}-${data.cate_name.replace(
        /\s/g,
        "-"
      )}`,
      thumbnail: data.thumbnail,
      rating: { score: 0, total: 0 },
      brand_name: data.brand_name,
    };

    let editData;
    if (vendorUser?.vendor) {
      editData = { ...productsObject, vendors_name: vendorUser.vendors_name };
    } else {
      editData = productsObject;
    }

    // https://localhost:5000/users?search=tamal&&order=asc
    // const search = req.query.search;
    fetch(
      `${getBaseUrl()}/product/edit/${data.cate_name}/${_id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(editData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Updated Successfully",
            showConfirmButton: false,
            timer: 2000,
          });
          reset();
          //     navigate("/products");
          props.onHide();
          setProducts(products?.map((pd) => (pd._id === _id ? editData : pd)));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleAllBrands();
  }, []);

  return (
    <Modal
      {...props}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='easy-mart-manage-product-modal'
    >
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <style type='text/css'>
          {`
                                    .easy-mart-edit-products input{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    color: ${getStarting?.primaryColor};
                                    }
                                    .easy-mart-edit-products select{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    }
                                    .easy-mart-edit-products input:active{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    }
                                    .easy-mart-edit-products input:hover{
                                    border: 1px solid ${getStarting?.primaryColor};
                                    transition: 1s;
                                    }
                                    `}
        </style>

        <div className='container'>
          <div className='easy-mart-edit-products'>
            <h2
              className='text-center py-1'
              style={{ color: getStarting?.primaryColor }}
            >
              Products Edit
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className='text-center'>
              <input
                defaultValue={_id}
                placeholder='Please Type Products Name'
                {...register("_id")}
                readOnly
                style={{ display: "none" }}
              />
              <input
                defaultValue={cate_name}
                placeholder='Please Type Products Name'
                {...register("cate_name")}
                readOnly
                style={{ color: "#000", opacity: 0.6 }}
              />
              <select {...register("brand_name")}>
                <option value='brands' style={{ display: "none" }}>
                  {brand_name}
                </option>
                {brands?.map((brand, i) => (
                  <option key={i} value={brand?.name}>
                    {brand?.name}
                  </option>
                ))}
              </select>
              <input
                defaultValue={cate_name}
                placeholder='Please Type Products Name'
                {...register("cate_name")}
                readOnly
                style={{ color: "#000", opacity: 0.6 }}
              />
              <input
                defaultValue={name}
                placeholder='Please Type Products Name'
                {...register("name")}
                required
              />
              <input
                defaultValue={product_code}
                type='number'
                placeholder='Please Type Product Code'
                {...register("product_code")}
                required
              />
              <input
                defaultValue={bar_code}
                placeholder='Please Type Bar Code'
                {...register("bar_code")}
              />
              <input
                defaultValue={sell_price}
                type='number'
                placeholder='Please Type Sell Price'
                {...register("sell_price")}
                required
              />
              <input
                defaultValue={discount}
                type='number'
                placeholder='Please Type Discount'
                {...register("discount")}
              />
              <input
                defaultValue={stock}
                type='number'
                placeholder='Please Type Total Stock'
                {...register("stock")}
              />
              {/* <input placeholder="Please Type Km" {...register("superOffer")} required/> */}
              {/* <input defaultValue={name} placeholder="Please Type Manual" {...register("slug")} required/> */}
              <input
                defaultValue={thumbnail}
                placeholder='Please Type Image Link'
                {...register("thumbnail")}
                required
              />
              <ImgCrop grid rotate>
                <Upload
                  action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                  listType='picture-card'
                  fileList={fileList}
                  onChange={onChange}
                >
                  {fileList.length < 3 && "+ Upload"}
                </Upload>
              </ImgCrop>
              <input
                type='submit'
                className='btn w-100 text-white'
                style={{ backgroundColor: getStarting?.primaryColor }}
              />
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ManageProductEdit;
