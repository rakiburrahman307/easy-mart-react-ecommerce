import React from 'react';
import { Container } from 'react-bootstrap';
import './BannerSmall.css';

import banner4 from '../../../images/banner/banner-04.webp';
import banner5 from '../../../images/banner/banner-05.webp';
import banner6 from '../../../images/banner/banner-06.webp';


const bannerImage = [ banner4, banner5, banner6 ]

const BannerSmall = () => {

    return (
        <div style={{marginTop: '10px'}}>
            <Container>
                <div className="easy-mart-banner-small-container" style={{marginTop: '30px'}}>
                {
                    bannerImage?.map((image, index) => (
                    <div className="easy-mart-banner-small-inner" key={index}>
                        <img src={image} className="w-100 h-100 rounded" alt="banner_small" />
                    </div>
                    ))
                }
                </div>
            </Container>
        </div>
    );
};

export default BannerSmall;