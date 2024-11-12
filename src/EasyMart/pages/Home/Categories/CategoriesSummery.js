import React from "react";
import "./CategoriesSummery.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import blankImage from "../../../images/blunk-image.png";
import Rating from "react-rating";
import useAuth from "../../../hooks/useAuth";
import ImageLoader from "../../../Shared/ImageLoader/ImageLoader";

const CategoriesSummery = (props) => {
  const { handleAddToCart, getStarting } = useAuth();
  const { thumbnail, name, slug, rating, sell_price, discount, _id } =
    props.product;

  const navigate = useNavigate();
  const handleProductDetails = () => {
    navigate(`/product/${slug}`);
  };

  const offer = (sell_price * discount) / 100;
  const offerPrice = parseInt(sell_price + offer);
  return (
    <div className='easy-mart-categories-summery'>
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
      <div className='easy-mart-categories-summery-content'>
        <h4 onClick={handleProductDetails}>{name}</h4>

        <div className='d-flex align-items-center justify-content-center'>
          {discount > 0 && (
            <>
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
            </>
          )}
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

export default CategoriesSummery;
