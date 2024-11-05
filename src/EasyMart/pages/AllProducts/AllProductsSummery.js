import React from "react";
import "./AllProductsSummery.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../../Shared/ImageLoader/ImageLoader";
import blankImage from "../../images/blunk-image.png";
import Rating from "react-rating";
import useAuth from "../../hooks/useAuth";

const AllProductsSummery = (props) => {
  const {
    thumbnail,
    name,
    slug,
    product_code,
    sell_price,
    discount,
    rating,
    cate_name,
  } = props.product;
  const { handleAddToCart, getStarting } = useAuth();

  const navigate = useNavigate();
  const handleProductDetails = () => {
    navigate(`/product/${slug}`);
  };

  const offer = (sell_price * discount) / 100;
  const offerPrice = sell_price + offer;
  return (
    <div
      className='tmp-all-products-summery-container'
      onClick={handleProductDetails}
    >
      <div className='tmp-all-products-summery-image'>
        <div className='image'>
          {/* <img src={image} className="" alt="" /> */}
          <ImageLoader url={thumbnail} thumb={blankImage} />
        </div>

        <div className='hover-box'>
          <ul>
            <li style={{ backgroundColor: `${getStarting?.primaryColor}` }}>
              <button onClick={handleProductDetails}>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </li>
            <li style={{ backgroundColor: `${getStarting?.primaryColor}` }}>
              <button onClick={() => handleAddToCart(props.product)}>
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </li>
          </ul>
        </div>
      </div>
      {discount > 0 && (
        <h6
          className='hot'
          style={{ backgroundColor: `${getStarting?.primaryColor}` }}
        >
          <span>{discount}%</span>
        </h6>
      )}
      <div style={{ padding: "20px 20px 10px" }}>
        <h4>{name}</h4>
        <h4>
          <span
            className='badge rounded-pill'
            style={{ fontSize: "14px",background: `${getStarting?.primaryColor}` }}
          >
            {cate_name}
          </span>
        </h4>

        <div className='d-flex align-items-center'>
          {discount > 0 ? (
            <>
              <p style={{ textDecoration: "line-through", fontWeight: "400" }}>
                {getStarting?.currency} {offerPrice.toFixed(0)}
              </p>
              &nbsp;&nbsp;
            </>
          ) : (
            ""
          )}
          <p style={{ color: `${getStarting?.primaryColor}` }}>
            {getStarting?.currency} {sell_price}
          </p>
        </div>
        <div className='d-flex align-items-center'>
          <Rating
            readonly
            placeholderRating={rating?.score || 0}
            emptySymbol={
              <span style={{ color: "#dadada", fontSize: "20px" }}>★</span>
            }
            placeholderSymbol={
              <span style={{ color: "#faca51", fontSize: "20px" }}>★</span>
            }
            fullSymbol={
              <span style={{ color: "#faca51", fontSize: "20px" }}>★</span>
            }
          />
          <p
            style={{
              marginBottom: "0px",
              fontSize: "15px",
              fontWeight: "400",
              color: "#9e9e9e",
            }}
          >
            &nbsp;({rating?.total || 0})
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllProductsSummery;
