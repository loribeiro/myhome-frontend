import React, { useEffect, useState } from "react";
import { isMobile, isTablet } from 'react-device-detect';
import JoinLinkExistentPageMobile from "../mobile/JoinLinkExistent"

const JoinLinkExistent = (props) =>{
    if(isMobile){
        return(
            <JoinLinkExistentPageMobile token = {props.token}/>
        )
    }else{
        return(
            <JoinLinkExistentPageMobile token = {props.token}/>
        )
    }
}
export default JoinLinkExistent;