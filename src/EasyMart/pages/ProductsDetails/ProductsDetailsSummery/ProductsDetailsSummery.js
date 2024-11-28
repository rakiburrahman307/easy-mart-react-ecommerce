import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import ReactImageMagnify from "react-image-magnify";
import Rating from "react-rating";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { Rating as SimpleRating } from "react-simple-star-rating";
import Swal from "sweetalert2/dist/sweetalert2.js";
import useAuth from "../../../hooks/useAuth";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import ProductsDetailsRatting from "./ProductsDetailsRatting";
import "./ProductsDetailsSummery.css";

import angryGif from "../../../images/reaction/angry.gif";
import hahaGif from "../../../images/reaction/haha.gif";
import likeGif from "../../../images/reaction/like.gif";
import loveGif from "../../../images/reaction/love.gif";
import sadGif from "../../../images/reaction/sad.gif";
import wowGif from "../../../images/reaction/wow.gif";

const product_colors = [
  { _id: "01", name: "blue" },
  { _id: "02", name: "red" },
  { _id: "03", name: "green" },
  { _id: "04", name: "black" },
  { _id: "05", name: "orange" },
];

const productRatting = [
  {
    _id: 1,
    rating: 3,
    name: "Kamal Mia",
    comment: "Very Nice. Thank you",
  },
  {
    _id: 2,
    rating: 5,
    name: "Shakil Ahmed",
    comment:
      "ভালো জিনিস ছিল। আমি  এতে ভীষণ খুশি হলাম। ধন্যবাদ আপনাকে ভাল জিনিসটি পাঠানোর জন।সবাই নিতেপারেন ।",
  },
  {
    _id: 3,
    rating: 4,
    name: "Konko Hasan",
    comment:
      "Pothomoto bolty chai selr er beheviore kubei valo🥰3 din r modde product ti haty paychi....Pawr bank ti kub ei valo...er lokks ta beshi sundor😌.....5020mh r phon 3 br chrg korty parbn....selr kubei valo...asha kori tar kas theke porduct nile thokben na☺️.....Tnq for selr💗",
  },
  {
    _id: 4,
    rating: 3,
    name: "Sahin Shuvo",
    comment:
      "Product build Quality too good. Fast delivery cilo. 3 diner modde hate peyechi. Overall i am satisfied. But,Product QR code scan kore S/N asce not matched. Ar he seller khov e helpful.",
  },
  {
    _id: 5,
    rating: 2,
    name: "Ayesha Khanom",
    comment:
      "100% AUTHENTIC PRODUCT. Thanks to seller.Fast charging supported. Recommended",
  },
  {
    _id: 6,
    rating: 4,
    name: "Rakib Hasan",
    comment: "I am satisfied. Ar he seller khov e helpful.",
  },
  {
    _id: 7,
    rating: 2,
    name: "Soumy Chawdhury",
    comment: "Very Good Product",
  },
];
const rating = {
  score: 4,
  total: 7,
};
const ProductsDetailsSummery = (props) => {
  const {
    product_code,
    name,
    stock,
    product_features,
    cate_name,
    discount,
    sell_price,
    _id,
    thumbnail,
  } = props.product;

  const {
    handleAddToCart,
    newQuantity,
    setNewQuantity,
    getStarting,
    handleAllCategory,
    handleCategory,
    handleProductColor,
    productColorId,
    handleClearWithoutCategories,
    categoriesProducts,
  } = useAuth();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rattingShow, setRattingShow] = useState(false);
  const [rattingValue, setRattingValue] = useState(0);
  const [rattingErrorMessage, setRattingErrorMessage] = useState("");
  const [reactZIndex, setReactZIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState("");

  const handleRattingShow = () => setRattingShow(true);
  const handleRattingClose = () => {
    setRattingShow(false);
    setRattingValue(0);
    setRattingErrorMessage("");
  };

  document.title = `${name} | ${getStarting.companyName}`;

  const offer = (sell_price * discount) / 100;
  const offerPrice = parseInt(sell_price + offer);

  const handleImageShow = (img) => {
    Swal.fire({
      imageUrl: `${img}`,
      imageWidth: "auto",
      imageHeight: "auto",
      imageAlt: "Custom image",
    });
  };
  const handleRatting = (rate) => {
    let value;
    if (rate === 20) {
      value = 1;
    } else if (rate === 40) {
      value = 2;
    } else if (rate === 60) {
      value = 3;
    } else if (rate === 80) {
      value = 4;
    } else if (rate === 100) {
      value = 5;
    }
    setRattingValue(value);
  };

  useEffect(() => {
    handleAllCategory();
  }, []);

  useEffect(() => {
    const newCateProducts = categoriesProducts?.find(
      (ctProducts) => ctProducts.cate_name === cate_name
    );
    const newRelatedProducts = newCateProducts?.products?.filter(
      (pd) => pd._id !== _id
    );
    setRelatedProducts(newRelatedProducts);
  }, [categoriesProducts, cate_name, _id]);

  const product_images = [
    `${thumbnail}`,
    "https://cdn.selfeb.com/images/view/images_4-Finger-5-pcs-Indian-Chocolate-101-Nescafa-Grocery_1650597998903.png?w=300&h=300&q=100",
    // "https://i.ibb.co/djynfrx/280600596-10158597157581891-4839986950427977431-n.jpg",
    "https://cdn.selfeb.com/images/view/images_Miniket-Standard-Rice-1kg-101-Grocery_1650598121179.png?w=300&h=300&q=100",
  ];
  const selectedImageSources =
    selectedImage !== "" ? selectedImage : product_images[0];
  return (
    <>
      <style type='text/css'>
        {`
                        .product-details-summery .carousel .thumb.selected, .product-details-summery .carousel .thumb:hover {
                            border: 3px solid ${getStarting?.primaryColor} !important;
                        }
                        .swal2-styled.swal2-confirm{
                            background-color: ${getStarting?.primaryColor} !important;
                        }
                        .carousel .slide img, carousel img {
                            width: auto !important;
                        }
                        .carousel .slider-wrapper.axis-horizontal .slider .slide {
                            background: #e0e0e0;
                            height: 500px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .product-details-summery-description .nav-link {
                            color: #495057 !important;
                        }
                        .product-details-summery-description .nav-link.active {
                            color: ${getStarting?.primaryColor} !important;
                        }
                        @media only screen and (min-width: 0px) and (max-width: 768px) {
                            .carousel .slide img, carousel img {
                                width: 100% !important;
                            }
                        }
                    `}
      </style>
      <div className='product-details-summery'>
        <div onClick={() => handleImageShow(selectedImageSources)}>
          <div
            style={{ border: "1px solid #dee2e6" }}
            onMouseOver={() => setReactZIndex(-2)}
            onMouseOut={() => setReactZIndex(1)}
          >
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  src: selectedImageSources,
                  // height: 10000
                },
                largeImage: {
                  src: selectedImageSources,
                  width: 1200,
                  height: 1800,
                },
              }}
            />
          </div>
          <div className='d-flex align-items-center justify-content-center my-5'>
            {product_images?.map((image, i) => (
              <div
                key={i}
                onMouseOver={() => setSelectedImage(image)}
                style={{
                  cursor: "pointer",
                  margin: "10px",
                  border: `3px solid ${
                    selectedImageSources === image
                      ? getStarting?.primaryColor
                      : "transparent"
                  }`,
                }}
              >
                {/* <img src={image} style={{maxHeight: '50px'}}  alt=""/> */}
                <img
                  src={image}
                  style={{ height: "50px", width: "50px" }}
                  alt=''
                />
              </div>
            ))}
          </div>
        </div>

        <div className='tmp-product-details-summery-inner'>
          <div>
            <h4>{name}</h4>
            <div className='d-flex align-items-center'>
              <Rating
                readonly
                placeholderRating={rating.score || 0}
                emptySymbol={
                  <span style={{ color: "#faca51", fontSize: "25px" }}>☆</span>
                }
                placeholderSymbol={
                  <span style={{ color: "#faca51", fontSize: "25px" }}>★</span>
                }
                fullSymbol={
                  <span style={{ color: "#faca51", fontSize: "25px" }}>★</span>
                }
              />
              <p
                style={{
                  color: getStarting?.primaryColor,
                  fontSize: "15px",
                  marginBottom: "0px",
                }}
              >
                {rating.total || 0} Ratings
              </p>
            </div>
            <div
              className={`${discount > 0 && "d-flex align-items-center"} price`}
              style={{ marginTop: "10px" }}
            >
              {discount > 0 && (
                <p
                  style={{
                    textDecoration: discount === 0 ? "none" : "line-through",
                    marginRight: "15px",
                    color: "#a1a1a1",
                  }}
                >
                  {getStarting?.currency} {offerPrice}
                </p>
              )}

              <p style={{ color: `${getStarting?.primaryColor}` }}>
                <span>
                  {getStarting?.currency} {sell_price}
                </span>
              </p>
            </div>
            <div className='product-summery-info'>
              <strong className='me-2'>SKU: </strong>
              <span style={{ color: getStarting?.primaryColor }}>
                {product_code}
              </span>
            </div>
            {/* Display Available Stock */}
            <div className='product-summery-info'>
              <strong className='me-2'>Stock: </strong>
              <span style={{ color: getStarting?.primaryColor }}>{stock}</span>
            </div>

            {/* {
                            product_features?.map(feature => <div key={feature._id}>
                                <span><strong>{feature.name}</strong>&nbsp;{feature.value}</span>
                            </div>)
                        } */}
            {product_features?.length > 0 && <br />}
            <div className='product-summery-info'>
              <strong>categories: </strong>
              <Link to='/products'>
                <span
                  onClick={handleCategory}
                  style={{
                    cursor: "pointer",
                    color: getStarting?.primaryColor,
                  }}
                >
                  {cate_name}
                </span>
              </Link>
            </div>
            {product_colors?.length > 0 && (
              <div className='product-summery-info d-flex flex-wrap'>
                <strong className='me-2'>Color: </strong>
                {product_colors?.map((color) => (
                  <span
                    onClick={() => handleProductColor(color?._id, color?.name)}
                    key={color?._id}
                    style={{
                      color: "#fff",
                      backgroundColor: color?.name,
                      border: `2px solid ${
                        productColorId === color?._id ? color?.name : "#fff"
                      }`,
                      outline: `2px solid ${
                        productColorId === color?._id
                          ? color?.name
                          : color?.name
                      }`,
                      padding: "2px 17px",
                      borderRadius: "50px",
                      margin: "0px 10px 10px 0px",
                      cursor: "pointer",
                    }}
                  >
                    {color?.name}{" "}
                  </span>
                ))}
              </div>
            )}

            <div className='d-flex align-items-center mb-3'>
              {stock > 0 ? (
                <>
                  {/* Decrease Quantity Button */}
                  <button
                    onClick={() =>
                      setNewQuantity((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={newQuantity <= 1}
                    style={{
                      color: getStarting?.primaryColor,
                      border: `1px solid ${getStarting?.primaryColor}`,
                      borderRadius: "2px",
                      backgroundColor: "transparent",
                      fontSize: "30px",
                      lineHeight: "0px",
                      padding: "15px",
                    }}
                  >
                    -
                  </button>

                  {/* Display Quantity */}
                  <h2
                    style={{
                      fontSize: "25px",
                      textAlign: "center",
                      width: "60px",
                      marginBottom: "0px",
                      padding: "2px",
                      borderRadius: "2px",
                    }}
                  >
                    {newQuantity}
                  </h2>

                  {/* Increase Quantity Button */}
                  <button
                    onClick={() =>
                      setNewQuantity((prev) => Math.min(prev + 1, stock, 5))
                    }
                    disabled={newQuantity >= Math.min(stock, 5)}
                    style={{
                      color: getStarting?.primaryColor,
                      border: `1px solid ${getStarting?.primaryColor}`,
                      borderRadius: "2px",
                      backgroundColor: "transparent",
                      fontSize: "30px",
                      lineHeight: "0px",
                      padding: "15px",
                    }}
                  >
                    +
                  </button>
                </>
              ) : (
                // When stock is 0, hide buttons and show "Out of Stock"
                <p style={{ color: "red", margin: "0" }}>Out of Stock</p>
              )}
            </div>

            <Button
              onClick={() => handleAddToCart(props.product, productColorId)}
              disabled={stock === 0}
              variant='primary'
              style={{
                backgroundColor: `${getStarting?.primaryColor}`,
                border: "none",
              }}
            >
              ADD TO CART
            </Button>
            <Link
              to={stock === 0 ? "#" : "/checkout"}
              onClick={(e) => stock === 0 && e.preventDefault()}
            >
              <Button
                onClick={() => handleAddToCart(props.product, productColorId)}
                disabled={stock === 0}
                variant='primary'
                style={{
                  backgroundColor: "#f57224",
                  border: "none",
                  marginLeft: "10px",
                }}
              >
                BUY NOW
              </Button>
            </Link>

            <div className='d-flex align-items-center product-details-reaction-container'>
              <div className='me-2'>
                <div
                  className='d-flex align-items-center reaction'
                  style={{ zIndex: reactZIndex }}
                >
                  <span className='d-flex align-items-center'>
                    <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;Like
                  </span>
                  <div className='reaction-view'>
                    <img src={likeGif} alt='' />
                    <img src={loveGif} alt='' />
                    <img src={sadGif} alt='' />
                    <img src={hahaGif} alt='' />
                    <img src={wowGif} alt='' />
                    <img src={angryGif} alt='' />
                  </div>
                </div>
              </div>
              <div
                style={{ cursor: "pointer", margin: "20px 0px" }}
                title='Create Ratting'
                onClick={handleRattingShow}
              >
                <SimpleRating
                  onClick={handleRatting}
                  ratingValue={rattingValue * 20}
                  showTooltip
                  tooltipArray={[
                    "Terrible",
                    "Bad",
                    "Average",
                    "Great",
                    "Prefect",
                  ]}
                />
              </div>
            </div>
            <ProductsDetailsRatting
              show={rattingShow}
              handleClose={handleRattingClose}
              productId={_id}
              handleRatting={handleRatting}
              rattingValue={rattingValue}
              rattingErrorMessage={rattingErrorMessage}
              setRattingErrorMessage={setRattingErrorMessage}
            ></ProductsDetailsRatting>
          </div>
        </div>
      </div>

      <div
        className='my-5 px-3 pt-3 pb-1 product-details-summery-description'
        style={{
          boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Tabs
          defaultActiveKey='description'
          transition={false}
          id='noanim-tab-example'
          className='mb-3'
        >
          <Tab
            eventKey='description'
            title='Description'
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {/* { description === null ?
                            <p style={{color: 'grey', textAlign: 'center'}}>There have been no description for this product yet.</p>
                            :
                            <HTMLRenderer
                                html={description}    
                            />
                        } */}
            <p className='description'>
              Introducing our latest addition to the world of modern fashion:
              Women’s Cable Knit Polo in Green by Gorur Ghash. This sleek and
              sophisticated polo combines classic elements with a contemporary
              twist, making it a must-have for the style-conscious man. Crafted
              with meticulous attention to detail, this polo is made from a
              unique cable rope patterned knitted fabric that sets it apart from
              the rest.
            </p>
            <p className='description'>
              Designed to exude elegance and versatility, this polo shirt
              features a refined green hue that complements any wardrobe. The
              absence of buttons adds a sleek touch, enhancing the clean and
              minimalist aesthetic. The collar and short sleeves offer a classic
              polo silhouette, while the cable pattern adds texture and visual
              interest, elevating the overall look. Not only does this polo
              offer unparalleled style, but it also delivers exceptional
              comfort. The knitted fabric is soft to the touch and lightweight,
              ensuring a breathable and cozy wearing experience. Whether you’re
              attending a casual gathering or heading to the office, this polo
              keeps you feeling cool and confident throughout the day.
            </p>
            <p className='description'>
              The Men’s Cable Knit Polo is designed to fit flawlessly, with a
              modern slim-cut silhouette that accentuates your physique. The
              high-quality craftsmanship ensures durability, making this polo a
              long-lasting addition to your wardrobe. It pairs effortlessly with
              your favorite pants or shorts, providing endless outfit
              possibilities for various occasions. Indulge in the timeless charm
              of the Men’s Cable Knit Polo in Green and redefine your style with
              a touch of sophistication. Make a lasting impression wherever you
              go and let this exceptional polo become a staple in your wardrobe.
              Elevate your fashion game with this contemporary twist on a
              classic essential.
            </p>
            <ul>
              <li>Features: Colour: Red and Blue.</li>
              <li>Pattern: Stripes.</li>
              <li>Revere Collar.</li>
              <li>Button Closure.</li>
              <li>Half Sleeve.</li>
              <li>Regular fit.</li>
            </ul>
            <p className='description'>
              It pairs effortlessly with your favorite pants or shorts,
              providing endless outfit possibilities for various occasions.
              Indulge in the timeless charm of the Men’s Cable Knit Polo in
              Green and redefine your style with a touch of sophistication. Make
              a lasting impression wherever you go and let this exceptional polo
              become a staple in your wardrobe. Elevate your fashion game with
              this contemporary twist on a classic essential.
            </p>
          </Tab>
          <Tab
            eventKey='reviews'
            title='Reviews'
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {
              // productRatting?.length === 0 ?
              // <p style={{color: 'grey', textAlign: 'center'}}>There have been no reviews for this product yet.</p>
              // :
              <>
                <div style={{ borderBottom: "1px solid #dee2e6" }}>
                  <Rating
                    readonly
                    placeholderRating={rating.score || 0}
                    emptySymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ☆
                      </span>
                    }
                    placeholderSymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ★
                      </span>
                    }
                    fullSymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ★
                      </span>
                    }
                  />
                  <p
                    style={{
                      color: getStarting?.primaryColor,
                      fontSize: "15px",
                    }}
                  >
                    {rating.total || 0} Ratings
                  </p>
                </div>
                <div>
                  {productRatting?.map((rate) => (
                    <div
                      key={rate._id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      {/* <p>{console.log(ratting.rating)}</p> */}
                      <Rating
                        readonly
                        placeholderRating={rate?.rating || 0}
                        emptySymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ☆
                          </span>
                        }
                        placeholderSymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ★
                          </span>
                        }
                        fullSymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ★
                          </span>
                        }
                      />
                      <p style={{ color: "grey", fontSize: "15px" }}>
                        by: {rate?.name}
                      </p>
                      <p>{rate.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            }
          </Tab>
        </Tabs>
      </div>

      <div>
        <h2 className='pb-1' style={{ fontSize: "25px" }}>
          Related Products
        </h2>
        <div className='tmp-ProductsDetailsInner-container'>
          <div style={{ paddingBottom: "10px" }}>
            <div
              className='d-flex align-item-center justify-content-between'
              style={{ borderBottom: "1px solid #eaeaea" }}
            >
              <h3 style={{ marginTop: "15px", marginBottom: "0px" }}>
                {cate_name}
              </h3>
              <Link to='/products' onClick={handleClearWithoutCategories}>
                <button
                  className='tmp-ProductsDetailsInner-products-btn'
                  style={{ backgroundColor: `${getStarting?.primaryColor}` }}
                >
                  <span>
                    View More{" "}
                    <div
                      onClick={handleCategory}
                      className='tmp-ProductsDetailsInner-products-btn-inner'
                    >
                      {cate_name}
                    </div>
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className='related-products-section-container'>
            {relatedProducts?.slice(0, 6)?.map((product) => (
              <RelatedProducts
                product={product}
                key={product._id}
              ></RelatedProducts>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDetailsSummery;
