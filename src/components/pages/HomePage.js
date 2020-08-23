import React,{Suspense,lazy, useState} from 'react';
import {isMobile} from 'react-device-detect';
import MobileHomePage from '../mobile/HomePage'
import HomePageDesktop from '../desktop/HomePage'
const HomePage = (props) =>{
    if(isMobile){

        return (
            
           <MobileHomePage/>
        )
    }
    return(
        <HomePageDesktop/>
    )
}

export default HomePage;

