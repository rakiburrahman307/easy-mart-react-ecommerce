import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import './Services.css';
import services1 from "../../../images/services/services-01.png";
import services2 from "../../../images/services/services-02.png";
import services3 from "../../../images/services/services-03.png";
import services4 from "../../../images/services/services-04.png";

const servicesData = [
    {
        "image": services1,
        "title": 'Original authenic products'
    },
    {
        "image": services2,
        "title": 'Fast delivery guranteed'
    },
    {
        "image": services3,
        "title": 'Easy return policy'
    },
    {
        "image": services4,
        "title": 'Cash on delivery available'
    }
];


const Services = () => {
    const {getStarting} = useAuth();
    return (
        <Container>
            <div className="easy-mart-services-container" style={{margin: '30px 0px'}}>
                <div className='easy-mart-services-list'>
                    {   
                        servicesData?.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                        :
                        servicesData?.map((data, i) => <div className="easy-mart-services" key={i}>
                            <div style={{height: '60px'}}>
                                <img src={data.image} style={{maxHeight: '60px', width: '100%'}} alt="" />
                            </div>
                            <h4>{data.title}</h4>
                        </div>)
                    }       
                </div>
            </div>
        </Container>
    );
};

export default Services;