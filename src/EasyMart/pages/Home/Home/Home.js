import React from 'react';
import Banner from '../Banner/Banner';
import BannerSmall from '../BannerSmall/BannerSmall';
import Categories from '../Categories/Categories';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import FeaturedShops from '../FeaturedShops/FeaturedShops';
import HomeCart from '../HomeCart/HomeCart';
import Offer from '../Offer/Offer';
import Services from '../Services/Services';
import Sponsor from '../Sponsor/Sponsor';
import TodayProducts from '../TodayProducts/TodayProducts';

const Home = () => {
    document.title = 'Home';
    
    return (
        <div> 
            <Banner/>
            <Offer/>
            <FeaturedCategories/>
            <BannerSmall/>
            <TodayProducts/>
            <FeaturedShops/>
            <Categories/>
            <Services/>
            <Sponsor/>

            {/* Fixed cart */}
            <HomeCart/>
        </div>
    );
};

export default Home;