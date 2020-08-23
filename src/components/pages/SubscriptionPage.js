import React,{Suspense,lazy, useState} from 'react';
import SubscriptionPageMobile from '../mobile/SubscriptionPage'
import { isMobile, isTablet } from 'react-device-detect';
import SubscriptionPageDesktop from '../desktop/SubscriptionPage'
const SubscriptionPage = (props) => {
    if(isMobile){
        
        return(
            <SubscriptionPageMobile />
        )
    }
    return(
        <SubscriptionPageDesktop/>
    )
}

export default SubscriptionPage;