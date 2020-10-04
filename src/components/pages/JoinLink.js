import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from 'react-device-detect';
import JoinLinkPageMobile from '../mobile/JoinLink'
import JoinLinkPageDesktop from '../desktop/JoinLink'
const JoinLink = (props) =>{
    if(isMobile){
        return(
            <JoinLinkPageMobile token = {props.token}/>
        )
    }else{
        return(
            <JoinLinkPageDesktop token = {props.token} />
        )
    }
}

export default JoinLink;