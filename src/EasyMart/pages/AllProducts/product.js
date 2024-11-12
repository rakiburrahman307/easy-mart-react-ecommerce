import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Placeholder,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./AllProducts.css";
import AllProductsSummery from "./AllProductsSummery";

const AllProducts = () => {
  document.title = "Products";

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

  const [sortOption, setSortOption] = useState("default");
  const [colors, setColors] = useState([
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
  ]); // Example colors
  const [selectedColors, setSelectedColors] = useState([]);

  const handleRangePrice = (e) => {
    setRangePrice(e.target.value);
    filterProducts();
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    sortProducts(option);
  };

  const handleColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
    filterProducts();
  };

  const filterProducts = () => {
    let filteredProducts = products.filter(
      (product) => product.sell_price <= rangePrice
    );

    if (superOfferCheckbox) {
      filteredProducts = filteredProducts.filter(
        (product) => product.superOffer
      );
    }

    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedColors.includes(product.color)
      );
    }

    setDisplayProducts(filteredProducts);
  };

  const sortProducts = (option) => {
    const sortedProducts = [...displayProducts];

    if (option === "priceLowToHigh") {
      sortedProducts.sort((a, b) => a.sell_price - b.sell_price);
    } else if (option === "priceHighToLow") {
      sortedProducts.sort((a, b) => b.sell_price - a.sell_price);
    } else if (option === "alphabetical") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setDisplayProducts(sortedProducts);
  };

  useEffect(() => {
    handleAllBrands();
    handleAllVendors();
    filterProducts(); // Initial filter
  }, [rangePrice, selectedColors, superOfferCheckbox]);

  return (
    <>
      <style type='text/css'>
        {`
                    .tmp11-all-product-btn:hover {
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                `}
      </style>
      <Container className='tmp-all-products-container'>
        <div className='tmp-search-container'>
          {/* Super Offer Checkbox */}
          <div
            className='d-flex align-items-center'
            style={{ padding: "0px 17px 6px", cursor: "pointer" }}
          >
            <input
              type='checkbox'
              checked={superOfferCheckbox}
              onChange={() => setSuperOfferCheckbox(!superOfferCheckbox)}
              style={{
                accentColor: superOfferCheckbox
                  ? getStarting?.primaryColor
                  : "red",
              }}
            />
            <h6
              onClick={() => setSuperOfferCheckbox(!superOfferCheckbox)}
              className='px-2'
              style={{
                color: superOfferCheckbox ? getStarting?.primaryColor : "red",
              }}
            >
              <strong>Super Offer</strong>
            </h6>
          </div>

          {/* Sorting Dropdown */}
          <Dropdown onSelect={handleSortChange}>
            <Dropdown.Toggle
              variant='secondary'
              className='focus-ring-none'
              id='dropdown-basic'
            >
              Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey='default'>Default</Dropdown.Item>
              <Dropdown.Item eventKey='priceLowToHigh'>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item eventKey='priceHighToLow'>
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item eventKey='alphabetical'>
                Alphabetical
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Categories */}
          <h6 className='mt-3'>
            <strong>Category</strong>
          </h6>
          {categories.map((unique) => (
            <div key={unique.name}>
              <Accordion style={{ borderBottom: "1px solid #eaeaea" }}>
                <Accordion.Item eventKey='0'>
                  <div
                    className='d-flex align-items-center'
                    style={{ padding: "6px 17px" }}
                  >
                    <input
                      type='checkbox'
                      checked={
                        categoriesCheckbox.includes(unique.name) ||
                        selectedCategory === unique.name
                      }
                      onChange={() => handleCategoriesCheckbox(unique.name)}
                    />
                    <div
                      onClick={handleCategory}
                      className='tmp-all-products-categories'
                    >
                      {unique.name}
                    </div>
                  </div>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}

          {/* Brands */}
          <h6 className='mt-3'>
            <strong>Brands</strong>
          </h6>
          {brands.map((brand) => (
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
                  brandsCheckbox.includes(brand.name) ||
                  selectedBrands === brand.name
                }
                onChange={() => handleBrandsCheckbox(brand.name)}
              />
              <div
                onClick={() => handleBrands(brand.name)}
                className='tmp-all-products-brands'
              >
                {brand.name}
              </div>
            </div>
          ))}

          {/* Color Filter */}
          <h6 className='mt-3'>
            <strong>Colors</strong>
          </h6>
          {colors.map((color) => (
            <div
              key={color}
              className='d-flex align-items-center'
              style={{ padding: "6px 17px" }}
            >
              <input
                type='checkbox'
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <span style={{ marginLeft: "10px" }}>{color}</span>
            </div>
          ))}

          {/* Price Range */}
          <h6 className='mt-3'>
            <strong>Price</strong>
          </h6>
          <h6>
            {getStarting?.currency} {rangePrice}
          </h6>
          <input
            type='range'
            onChange={handleRangePrice}
            min={0}
            max={800}
            value={rangePrice}
            style={{ accentColor: `${getStarting?.primaryColor}` }}
          />

          <button
            onClick={handleClearAllProductsPage}
            style={{
              backgroundColor: `${getStarting?.primaryColor}`,
              border: "none",
              padding: "5px 20px",
              borderRadius: "4px",
              color: "#fff",
              marginTop: "15px",
            }}
          >
            Clear Filter
          </button>
        </div>

        <div className='tmp-all-products-inner'>
          {displayProducts.length === 0 ? (
            <div
              style={{
                color: `${getStarting?.primaryColor}`,
                margin: "50px 0",
                textAlign: "center",
              }}
            >
              <h4>No Products Available</h4>
            </div>
          ) : (
            displayProducts.map((product) => (
              <AllProductsSummery product={product} key={product._id} />
            ))
          )}
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
