import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Container, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import useAuth from '../../../hooks/useAuth';
import blankSlider from '../../../images/blank-slider.png';
import categoriesImage from '../../../images/categories.jpg';
import './Banner.css';

import banner1 from '../../../images/banner/banner-01.webp';
import banner2 from '../../../images/banner/banner-02.webp';
import banner3 from '../../../images/banner/banner-03.webp';

const bannerImage = [ banner1, banner2, banner3 ]

const Banner = () => {
    const { getStarting, categories, handleAllCategory, handleCategory, selectedCategory, setHeaderSearchText} = useAuth();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    useEffect(() => {
        handleAllCategory();
    }, [])
   
    return (
        <Container>
             <style type="text/css">
                {
                  `.easy-mart-banner-slider .slick-prev, .easy-mart-banner-slider .slick-next{
                        background-color: ${getStarting?.primaryColor} !important;
                   }
                   .easy-mart-banner-slider .slick-dots li.slick-active button:before{
                        color: ${getStarting?.primaryColor} !important;
                        font-size: 14px !important;
                    }
                   .easy-mart-banner-dropdown-container span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                   `
                }
            </style>
            <div className="easy-mart-banner-container">
                <div className="easy-mart-banner-categories">
                    <div className="easy-mart-banner-menu-header" style={{backgroundColor: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}>
                        <FontAwesomeIcon icon={faBars} /> &nbsp;&nbsp;
                        <h4>Categories</h4>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                            <Link to={`/products/`} onClick={() => setHeaderSearchText('')}>
                                {   
                                    categories.length === 0 ?
                                    <>
                                        {Array.from(Array(9)).map((_, i) => (
                                            <div className="easy-mart-banner-menu-categories" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))}
                                    </>
                                    :
                                    categories?.slice()?.reverse()?.map(unique => <div key={unique.name} className="easy-mart-banner-menu-categories d-flex align-items-center w-100">
                                        <div style={{height: '17px', width: '17px', marginTop: '-12px'}}>
                                            <img src={unique?.logo_url ? unique?.logo_url : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <div className="easy-mart-banner-dropdown-container w-100">
                                            <span onClick={handleCategory} style={{marginLeft: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`, fontSize: '13px'}}>{unique.name}</span>
                                         
                                            <div className="easy-mart-banner-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '450px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                        <span onClick={handleCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor :'#000'}`}}>{subCat.name}</span>   
                                                    <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                    {
                                                        subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                            <span onClick={handleCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#4b5563'}`}}>{subCatChild.name}</span>
                                                        </div>)
                                                    }
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>)
                                }       
                            </Link>
                        </div>
                    </div>
                </div>
                {   
                    bannerImage?.length === 0 ?
                    <div className="easy-mart-banner-slider">
                        <div className="banner-image" style={{height: '450px'}}>
                            <img src={blankSlider} alt=""/>
                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 800 x 486</h2>
                        </div>
                    </div>
                    :
                    <div className="easy-mart-banner-slider">
                        <Slider {...settings}>
                            {
                                bannerImage?.map((image, index) => (
                                    <div className="banner-image" key={index}>
                                        <img src={image} alt="banner_image"/>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div> 
                }
            </div>
        </Container>
    );
};
export default Banner;