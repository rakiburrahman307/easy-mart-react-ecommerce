import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Dropdown,
  Placeholder,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./AllProducts.css";
import AllProductsSummery from "./AllProductsSummery";

const AllProducts = () => {
  const [sortOption, setSortOption] = useState("default");
  const [defaultProduct, setDefaultProducts] = useState([]);
  document.title = "Products";

  // const { getStarting, setHeaderSearchText, superOffer, superOfferCheckbox, setSuperOfferCheckbox,
  //         products, displayProducts, setDisplayProducts,
  //         categories , handleCategory, selectedCategory, setSelectedCategory, handleCategoriesCheckbox, categoriesCheckbox, setCategoriesCheckbox,
  //         brands, handleBrands, selectedBrands, setSelectedBrands, handleBrandsCheckbox, brandsCheckbox, setBrandsCheckbox,
  //         vendors, rangePrice, setRangePrice, handleVendorsCheckbox, vendorsCheckbox, setVendorsCheckbox,
  //         handleAllCategory, handleAllBrands, handleAllVendors, handleClearAllProductsPage } = useAuth();

  const {
    getStarting,
    products,
    displayProducts,
    setDisplayProducts,
    superOffer,
    superOfferCheckbox,
    setSuperOfferCheckbox,
    categories,
    handleCategory,
    selectedCategory,
    setSelectedCategory,
    handleCategoriesCheckbox,
    categoriesCheckbox,
    setCategoriesCheckbox,
    brands,
    handleBrands,
    selectedBrands,
    setSelectedBrands,
    handleBrandsCheckbox,
    brandsCheckbox,
    setBrandsCheckbox,
    vendors,
    vendorsCheckbox,
    setVendorsCheckbox,
    handleVendorsCheckbox,
    rangePrice,
    setRangePrice,
    handleAllBrands,
    handleAllVendors,
    handleClearAllProductsPage,
  } = useAuth();

  const handleRangePrice = (e) => {
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setSuperOfferCheckbox(false);

    setRangePrice(e.target.value);
    const newProduct = products?.filter(
      (product) => product.sell_price <= e.target.value
    );
    setDisplayProducts(newProduct);
  };

  useEffect(() => {
    handleAllVendors();
    handleAllBrands();
    setDefaultProducts(displayProducts);
  }, []);
  const handleSortChange = (option) => {
    setSortOption(option);
    sortProducts(option);
  };
  const sortProducts = (option) => {
    if (option === "default") {
      setDisplayProducts(defaultProduct);
      console.log(...defaultProduct);
      return;
    }

    const sortedProducts = [...displayProducts];

    if (option === "A to Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // A-Z
    } else if (option === "Z to A") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Z-A
    }

    setDisplayProducts(sortedProducts);
  };

  return (
    <>
      <style type='text/css'>
        {`
                   .tmp11-all-product-btn:hover{
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                    // .tmp-search-container span, .tmp-all-products-categories{
                    //     display: -webkit-box;
                    //     -webkit-line-clamp: 1;
                    //     -webkit-box-orient: vertical;  
                    //     overflow: hidden;
                    // }
                    .tmp-all-products-categories:hover,
                     .tmp-search-container span:hover, .tmp-all-products-brands:hover, .tmp-all-products-vendors:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `}
      </style>
      <div className='py-3 tmp-all-products-top-heading'>
        <Container>
          <h2 style={{ fontSize: "18px", marginTop: "10px" }}>
            Home / Products{" "}
            <span style={{ color: `${getStarting?.primaryColor}` }}>
              {displayProducts?.length}
            </span>
          </h2>
        </Container>
        {/* <Form.Check type="checkbox" aria-label="option 1" />
                <input type="checkbox" value={categoriesCheckbox} onChange={() => setCategoriesCheckbox(!categoriesCheckbox)} /> */}
      </div>
      <Container className='tmp-all-products-container'>
        <div>
          <div className='tmp-search-container'>
            {superOffer?.length === 0 ? (
              ""
            ) : (
              <>
                <div
                  className='d-flex align-items-center'
                  style={{ padding: "0px 17px 6px", cursor: "pointer" }}
                >
                  <input
                    type='checkbox'
                    checked={superOfferCheckbox === true ? true : false}
                    onChange={() => setSuperOfferCheckbox(!superOfferCheckbox)}
                    style={{
                      accentColor: `${
                        superOfferCheckbox === true
                          ? getStarting?.primaryColor
                          : "red"
                      }`,
                      marginTop: "-8px",
                      cursor: "pointer",
                    }}
                  />
                  <h6
                    onClick={() => setSuperOfferCheckbox(!superOfferCheckbox)}
                    className='px-2'
                    style={{
                      color: `${
                        superOfferCheckbox === true
                          ? getStarting?.primaryColor
                          : "red"
                      }`,
                    }}
                  >
                    <strong>Super Offer</strong>
                  </h6>
                </div>
              </>
            )}

            <h6 className='px-3'>
              <strong>Category</strong>
            </h6>
            {categories.length === 0 ? (
              <>
                {Array.from(Array(20)).map((_, i) => (
                  <div key={i} style={{ padding: "10px 17px" }}>
                    <Placeholder animation='glow'>
                      <Placeholder xs={8} />
                    </Placeholder>
                  </div>
                ))}
              </>
            ) : (
              categories
                ?.slice(0)
                .reverse()
                .map((unique) => (
                  <div key={unique.name}>
                    <Accordion style={{ borderBottom: "1px solid #eaeaea" }}>
                      <Accordion.Item eventKey='0'>
                        {unique?.subCategories?.length === 0 ? (
                          <div
                            className='d-flex align-items-center'
                            style={{ padding: "6px 17px" }}
                          >
                            <input
                              type='checkbox'
                              checked={
                                categoriesCheckbox?.includes(unique.name) ===
                                  true || selectedCategory === unique.name
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                handleCategoriesCheckbox(unique.name)
                              }
                              style={{
                                accentColor: `${
                                  categoriesCheckbox?.includes(unique.name) ===
                                    true || selectedCategory === unique.name
                                    ? getStarting?.primaryColor
                                    : ""
                                }`,
                                cursor: "pointer",
                              }}
                            />
                            {/* <input type="checkbox" value={categoriesCheckbox} onChange={() => setCategoriesCheckbox(!categoriesCheckbox)} style={{accentColor: `${getStarting?.primaryColor}`}} /> */}
                            <div
                              onClick={handleCategory}
                              className='tmp-all-products-categories'
                              style={{
                                color: `${
                                  categoriesCheckbox?.includes(unique.name) ===
                                    true || selectedCategory === unique.name
                                    ? getStarting?.primaryColor
                                    : "#666666"
                                }`,
                              }}
                              key={unique.name}
                            >
                              {unique.name}
                            </div>
                          </div>
                        ) : (
                          <>
                            <Accordion.Header style={{ marginRight: "10px" }}>
                              <div
                                className='d-flex align-items-center'
                                style={{ padding: "8px 17px" }}
                              >
                                <input
                                  type='checkbox'
                                  checked={
                                    categoriesCheckbox?.includes(
                                      unique.name
                                    ) === true ||
                                    selectedCategory === unique.name
                                      ? true
                                      : false
                                  }
                                  onChange={() =>
                                    handleCategoriesCheckbox(unique.name)
                                  }
                                  style={{
                                    accentColor: `${
                                      categoriesCheckbox?.includes(
                                        unique.name
                                      ) === true ||
                                      selectedCategory === unique.name
                                        ? getStarting?.primaryColor
                                        : ""
                                    }`,
                                    cursor: "pointer",
                                  }}
                                />
                                <div
                                  onClick={handleCategory}
                                  className='tmp-all-products-categories'
                                  style={{
                                    color: `${
                                      categoriesCheckbox?.includes(
                                        unique.name
                                      ) === true ||
                                      selectedCategory === unique.name
                                        ? getStarting?.primaryColor
                                        : "#666666"
                                    }`,
                                  }}
                                  key={unique.name}
                                >
                                  {unique.name}
                                </div>
                              </div>
                            </Accordion.Header>
                            {unique?.subCategories?.map((subCat) => (
                              <div key={subCat._id}>
                                <Accordion.Body>
                                  <Accordion>
                                    <Accordion.Item eventKey='0'>
                                      {subCat?.childs?.length === 0 ? (
                                        <div
                                          className='d-flex align-items-center'
                                          style={{ padding: "8px 17px" }}
                                        >
                                          <input
                                            type='checkbox'
                                            checked={
                                              categoriesCheckbox?.includes(
                                                subCat.name
                                              ) === true ||
                                              selectedCategory === subCat.name
                                                ? true
                                                : false
                                            }
                                            onChange={() =>
                                              handleCategoriesCheckbox(
                                                subCat.name
                                              )
                                            }
                                            style={{
                                              accentColor: `${
                                                categoriesCheckbox?.includes(
                                                  subCat.name
                                                ) === true ||
                                                selectedCategory === subCat.name
                                                  ? getStarting?.primaryColor
                                                  : ""
                                              }`,
                                              cursor: "pointer",
                                            }}
                                          />
                                          <span
                                            onClick={handleCategory}
                                            style={{
                                              fontSize: "13px",
                                              color: `${
                                                categoriesCheckbox?.includes(
                                                  subCat.name
                                                ) === true ||
                                                selectedCategory === subCat.name
                                                  ? getStarting?.primaryColor
                                                  : "#4b5563"
                                              }`,
                                              padding: "1px 5px 0px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {subCat.name}
                                          </span>
                                        </div>
                                      ) : (
                                        <>
                                          <Accordion.Header>
                                            <div
                                              className='d-flex align-items-center'
                                              style={{ padding: "8px 17px" }}
                                            >
                                              <input
                                                type='checkbox'
                                                checked={
                                                  categoriesCheckbox?.includes(
                                                    subCat.name
                                                  ) === true ||
                                                  selectedCategory ===
                                                    subCat.name
                                                    ? true
                                                    : false
                                                }
                                                onChange={() =>
                                                  handleCategoriesCheckbox(
                                                    subCat.name
                                                  )
                                                }
                                                style={{
                                                  accentColor: `${
                                                    categoriesCheckbox?.includes(
                                                      subCat.name
                                                    ) === true ||
                                                    selectedCategory ===
                                                      subCat.name
                                                      ? getStarting?.primaryColor
                                                      : ""
                                                  }`,
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <span
                                                onClick={handleCategory}
                                                style={{
                                                  fontSize: "13px",
                                                  color: `${
                                                    categoriesCheckbox?.includes(
                                                      subCat.name
                                                    ) === true ||
                                                    selectedCategory ===
                                                      subCat.name
                                                      ? getStarting?.primaryColor
                                                      : "#4b5563"
                                                  }`,
                                                  padding: "1px 5px 0px",
                                                }}
                                              >
                                                {subCat.name}
                                              </span>
                                            </div>
                                          </Accordion.Header>
                                          {subCat?.childs?.map(
                                            (subCatChild) => (
                                              <div key={subCatChild._id}>
                                                <Accordion.Body>
                                                  <div
                                                    className='d-flex align-items-center'
                                                    style={{
                                                      padding: "8px 17px",
                                                    }}
                                                  >
                                                    <input
                                                      type='checkbox'
                                                      checked={
                                                        categoriesCheckbox?.includes(
                                                          subCatChild.name
                                                        ) === true ||
                                                        selectedCategory ===
                                                          subCatChild.name
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() =>
                                                        handleCategoriesCheckbox(
                                                          subCatChild.name
                                                        )
                                                      }
                                                      style={{
                                                        accentColor: `${
                                                          categoriesCheckbox?.includes(
                                                            subCatChild.name
                                                          ) === true ||
                                                          selectedCategory ===
                                                            subCatChild.name
                                                            ? getStarting?.primaryColor
                                                            : ""
                                                        }`,
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                    <span
                                                      onClick={handleCategory}
                                                      style={{
                                                        fontSize: "11px",
                                                        color: `${
                                                          categoriesCheckbox?.includes(
                                                            subCatChild.name
                                                          ) === true ||
                                                          selectedCategory ===
                                                            subCatChild.name
                                                            ? getStarting?.primaryColor
                                                            : "#4b5563"
                                                        }`,
                                                        padding: "1px 5px 0px",
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      {subCatChild.name}
                                                    </span>
                                                  </div>
                                                </Accordion.Body>
                                              </div>
                                            )
                                          )}
                                        </>
                                      )}
                                    </Accordion.Item>
                                  </Accordion>
                                </Accordion.Body>
                              </div>
                            ))}
                          </>
                        )}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))
            )}

            {brands?.length === 0 ? (
              <></>
            ) : (
              <>
                <h6 className='mt-3 px-3'>
                  <strong>Brands</strong>
                </h6>
                {brands?.map((brand) => (
                  <div
                    key={brand.name}
                    className='d-flex align-items-center'
                    style={{
                      padding: "6px 17px",
                      borderBottom: "1px solid #eaeaea",
                      cursor: "pointer",
                    }}
                  >
                    <input
                      type='checkbox'
                      checked={
                        brandsCheckbox?.includes(brand.name) === true ||
                        selectedBrands === brand.name
                          ? true
                          : false
                      }
                      onChange={() => handleBrandsCheckbox(brand.name)}
                      style={{
                        accentColor: `${
                          brandsCheckbox?.includes(brand.name) === true ||
                          selectedBrands === brand.name
                            ? getStarting?.primaryColor
                            : ""
                        }`,
                        cursor: "pointer",
                      }}
                    />
                    <div
                      onClick={() => handleBrands(brand.name)}
                      className='tmp-all-products-brands'
                      style={{
                        color: `${
                          brandsCheckbox?.includes(brand.name) === true ||
                          selectedBrands === brand.name
                            ? getStarting?.primaryColor
                            : "#666666"
                        }`,
                      }}
                    >
                      {brand.name}
                    </div>
                  </div>
                ))}
              </>
            )}

            {vendors?.length === 0 ? (
              <>
                {/* {Array.from(Array(3)).map((_, i) => (
                                        <div className="tmp-all-products-vendors" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                    ))} */}
              </>
            ) : (
              <>
                <h6 className='mt-3 px-3'>
                  <strong>Vendors</strong>
                </h6>
                {vendors?.map((vendor) => (
                  <div
                    key={vendor._id}
                    className='d-flex align-items-center'
                    style={{
                      padding: "6px 17px",
                      borderBottom: "1px solid #eaeaea",
                    }}
                  >
                    <input
                      type='checkbox'
                      checked={
                        vendorsCheckbox?.includes(vendor?.name) === true
                          ? true
                          : false
                      }
                      onChange={() => handleVendorsCheckbox(vendor?.name)}
                      style={{
                        accentColor: `${
                          vendorsCheckbox?.includes(vendor?.name) === true
                            ? getStarting?.primaryColor
                            : ""
                        }`,
                        cursor: "pointer",
                      }}
                    />
                    <Link to={`/products/vendors/${vendor.name}`}>
                      <div
                        className='tmp-all-products-vendors'
                        style={{
                          color: `${
                            vendorsCheckbox?.includes(vendor.name) === true
                              ? getStarting?.primaryColor
                              : "#666666"
                          }`,
                        }}
                      >
                        {vendor.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            )}

            <h6 className='mt-3 px-3'>
              <strong>Price</strong>
            </h6>
            <h6 className='px-3'>
              {getStarting?.currency} {rangePrice}
            </h6>
            <input
              type='range'
              onChange={handleRangePrice}
              min={0}
              max={800}
              value={rangePrice}
              name='price'
              className='mx-3'
              style={{ accentColor: `${getStarting?.primaryColor}` }}
            />

            <br />
            <br />
            <button
              onClick={handleClearAllProductsPage}
              style={{
                backgroundColor: `${getStarting?.primaryColor}`,
                border: "none",
                padding: "5px 20px",
                borderRadius: "4px",
                color: "#fff",
                marginLeft: "17px",
              }}
            >
              Clear Filter
            </button>
            {/* Sorting Dropdown */}
            <Dropdown onSelect={handleSortChange} className='custom-dropdown'>
              <Dropdown.Toggle
                variant='secondary'
                id='dropdown-basic'
                style={{
                  background: `${getStarting?.primaryColor}`,
                  padding: "6px 15px",
                  border: "none",
                }}
                className='custom-toggle'
              >
                Sort By {sortOption}
              </Dropdown.Toggle>
              <Dropdown.Menu className='custom-menu'>
                <Dropdown.Item eventKey='default'>Default</Dropdown.Item>
                <Dropdown.Item eventKey='A to Z'>A to Z</Dropdown.Item>
                <Dropdown.Item eventKey='Z to A'>Z to A</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <div>
            {displayProducts?.length === 0 ? (
              <div
                style={{
                  color: `${getStarting?.primaryColor}`,
                  margin: "50px 0",
                  textAlign: "center",
                }}
              >
                {/* <Spinner animation="border" /> */}
                <h4>No Show Any Product</h4>
              </div>
            ) : (
              <div className='tmp-all-products-inner'>
                {displayProducts?.map((product) => (
                  <AllProductsSummery
                    product={product}
                    key={product._id}
                  ></AllProductsSummery>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <div className='py-5 text-center'>
        <Link to='/'>
          <Button
            variant='primary'
            style={{
              backgroundColor: `${getStarting?.primaryColor}`,
              border: "none",
            }}
          >
            Back Home
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AllProducts;
