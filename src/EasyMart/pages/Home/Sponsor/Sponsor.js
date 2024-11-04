import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";
import useAuth from '../../../hooks/useAuth';
// import './Sponsor.css';

import sponsor01 from "../../../images/sponsor/sponsor-01.png";
import sponsor02 from "../../../images/sponsor/sponsor-02.png";
import sponsor03 from "../../../images/sponsor/sponsor-03.png";
import sponsor04 from "../../../images/sponsor/sponsor-04.png";
import sponsor05 from "../../../images/sponsor/sponsor-05.png";
import sponsor06 from "../../../images/sponsor/sponsor-06.png";
import sponsor07 from "../../../images/sponsor/sponsor-07.png";
import sponsor08 from "../../../images/sponsor/sponsor-08.png";
import sponsor09 from "../../../images/sponsor/sponsor-09.png";
import sponsor10 from "../../../images/sponsor/sponsor-10.png";
import sponsor11 from "../../../images/sponsor/sponsor-11.png";

function CustomArrow(props) {
    const { className, style, onClick } = props;
    const {getStarting} = useAuth()

    return (
      <>
        <style type="text/css">
        {
          `.customsSlider:before {
              color: ${getStarting?.primaryColor} !important;
            }
          `
        }
        </style>
        <div
          className={className + " customsSlider"}
          style={{ ...style }}
          onClick={onClick}
        />
      </>
    );
}

const Sponsor = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 6,
            }
          }, 
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
            }
          }, 
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          }, 
        ]
      };

      const data = [ sponsor01, sponsor02, sponsor03, sponsor04, sponsor05, sponsor06, sponsor07, sponsor08, sponsor09, sponsor10, sponsor11]
      // const data = [
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/63157a7499b1a.png" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/63197148c2211.jpg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/632c08bb10cac.jpg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/635a3327e2319.jpeg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/635a3327c9520.jpeg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/632c01a9817a9.png" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/633e73fe44ca5.png" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/635a3327cd136.jpeg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/631991767cb15.jpg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/6319c4d2a823c.jpeg" },
      //     { "image": "https://api.kholabazaar.com.bd/media/thumbnail/media/632beba79ee4f.png" },
      // ]
    return (
        <Container>
            <div style={{backgroundColor: '#fff', padding: '20px', margin: '30px 0px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)'}}>
                <Slider {...settings}>
                    {
                        data?.map((item, i) => <div key={i} >
                            <div style={{padding: '40px'}}>
                              <img src={item}  style={{ height: '50px', margin: '0 auto'}} alt="" />
                            </div>
                        </div>)
                    }
                </Slider>
            </div>
        </Container>
    );
};

export default Sponsor;