import React from 'react';
import useAuth from '../../hooks/useAuth';
import './About.css';

const About = () => {
    document.title = 'About Us';
    const { getStarting } = useAuth();
    return (
        <div className="py-5">
            <div className="container">
                <div>
                    <h3 style={{color: getStarting?.primaryColor}}>About Us</h3>
                    <p>Easy Mart was founded by like-minded, young and motivated individuals with a vision to take freelancing and remote employment as a career path to 160 million Bangladeshis and to create the employment of 1M Bangladeshis within 2022. We aim to create professionals for the national and international marketplaces by providing world-class smart IT education in Bangladesh. At eShikhon, we want to establish a sustainable self-dependency through the online employment model all over the 64 districts of Bangladesh. From the inauguration on 17th May 2017 till today, eShikhon has trained 7630+ trainees so far, and it's increasing every day. Our students have reached a combined earning of $1 million (USD) so far. Over 320K+ people are connected with us through social media and supporting our mission.</p>
                </div>
                <div>
                    <h3 style={{color: getStarting?.primaryColor}}>Terms and Conditions</h3>
                    <p>Easy Mart dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
                    <p>Easy Mart dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div>
                    <h3 style={{color: getStarting?.primaryColor}}>Etiam sed fermentum lectus. Quisque vitae ipsum libero</h3>
                    <p>Easy Mart sit amet vehicula arcu. Etiam pulvinar dui libero, vitae fringilla nulla convallis in. Fusce sagittis cursus nisl, at consectetur elit vestibulum vestibulum:</p>
                    <ul>
                        <li>Nunc pulvinar efficitur interdum.</li>
                        <li>Donec feugiat feugiat pulvinar.</li>
                        <li>Suspendisse eu risus feugiat, pellentesque arcu eu, molestie lorem.</li>
                        <li>Duis non leo commodo, euismod ipsum a, feugiat libero.</li>
                    </ul>
                </div>
                <div>
                    <h3 style={{color: getStarting?.primaryColor}}>Etiam blandit lacus</h3>
                    <p>Easy Mart dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    <p>Easy Mart dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div>
                    <h3 style={{color: getStarting?.primaryColor}}>Maecenas sit amet</h3>
                    <p>Easy Mart dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
    );
};

export default About;