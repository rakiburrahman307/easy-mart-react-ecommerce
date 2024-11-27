import React from "react";
import "./TodayProductSummery.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import blankImage from "../../../images/blunk-image.png";
import Rating from "react-rating";
import useAuth from "../../../hooks/useAuth";
import ImageLoader from "../../../Shared/ImageLoader/ImageLoader";

const TodayProductsSummery = (props) => {
  const { thumbnail, name, sell_price, rating, slug, discount, cate_name } =
    props.product;
  const { handleAddToCart, getStarting } = useAuth();

  const navigate = useNavigate();
  const handleProductDetails = () => {
    navigate(`/product/${slug}`);
  };

  const offer = (sell_price * discount) / 100;
  const offerPrice = parseInt(sell_price + offer);

  return (
    <div className='easy-mart-today-products-inner'>
      <div>
        {discount > 0 ? (
          <div
            className='sale-badge'
            style={{ backgroundColor: `${getStarting?.primaryColor}` }}
          >
            <span>{discount}%</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className='image'
        onClick={handleProductDetails}
        style={{ cursor: "pointer" }}
      >
        <ImageLoader url={thumbnail} thumb={blankImage} />
        <div className='hover-box'></div>
      </div>
      <div className='easy-mart-today-products-summery-content'>
        <h4 onClick={handleProductDetails}>{name}</h4>
        <h4>
          <span
            className='badge rounded-pill'
            style={{
              fontSize: "13px",
              background: `${getStarting?.primaryColor}`,
            }}
          >
           {cate_name.length > 10 ? cate_name.substring(0, 10) + "..." : cate_name}

          </span>
        </h4>
        <div className='d-flex align-items-center justify-content-center'>
          <p
            style={{
              marginBottom: "0px",
              fontSize: "14px",
              fontWeight: "300",
              color: "#928f8f",
              textDecoration: "line-through",
            }}
          >
            {getStarting?.currency} {offerPrice}
          </p>
          &nbsp;&nbsp;&nbsp;
          <p
            style={{
              marginBottom: "0px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1b1b28",
            }}
          >
            {getStarting?.currency} {sell_price}
          </p>
        </div>
        <div className='d-flex align-items-center justify-content-center'>
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
        <Button
          onClick={() => handleAddToCart(props.product)}
          className='product-btn'
          style={{ color: `${getStarting?.primaryColor}` }}
        >
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default TodayProductsSummery;
