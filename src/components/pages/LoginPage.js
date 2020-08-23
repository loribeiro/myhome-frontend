import React,{Suspense,lazy, useState} from 'react';
import LoginPageMobile from '../mobile/LoginPage'
import { isMobile, isTablet } from 'react-device-detect';
import LoginPageDesktop from "../desktop/LoginPage"
const LoginPage = (props) =>{
    if(isMobile){

        return (
            
           <LoginPageMobile/>
        )
    }
    return(
        <LoginPageDesktop/>
    )
}

export default LoginPage;