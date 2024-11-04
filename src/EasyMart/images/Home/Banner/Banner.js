import React from 'react';
import { Container,  Placeholder } from 'react-bootstrap';
import './Banner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import blankSlider from '../../../GlobalShared/images/blank-slider.png';
import useAuth from '../../../GlobalShared/hooks/useAuth';



const Banner = () => {
    const { getStarting} = useAuth();

    return (
        <Container>
             <style type="text/css">
                {
                  `.tmp10-banner-slider .slick-prev, .tmp10-banner-slider .slick-next{
                        background-color: ${getStarting?.primaryColor} !important;
                   }
                   .tmp10-banner-slider .slick-dots li.slick-active button:before{
                        color: ${getStarting?.primaryColor} !important;
                        font-size: 14px !important;
                    }
                   .tmp10-banner-dropdown-container span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                   `
                }
            </style>
            <div className="tmp10-banner-container">
                <div className="tmp10-banner-categories">
                    <div className="tmp10-banner-menu-header" style={{backgroundColor: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}>
                        <FontAwesomeIcon icon={faBars} /> &nbsp;&nbsp;
                        <h4>Categories</h4>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                            {Array.from(Array(9)).map((_, i) => (
                                <div className="tmp10-banner-menu-categories" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="tmp10-banner-slider">
                    <div className="banner-image" style={{height: '450px'}}>
                        <img src={blankSlider} alt=""/>
                        <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 800 x 486</h2>
                    </div>
                </div>
            </div>
        </Container>
    );
};
export default Banner;