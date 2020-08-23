import React, { useEffect, useState } from "react";
import {JoinArea} from "../mobile/JoinPage"
import JoinHomeDesktop from "../desktop/JoinHome"
import { isMobile, isTablet } from 'react-device-detect';

const JoinPage = (props) =>{
    if(isMobile){
        return(
           
           <JoinArea/>
               
        )
    }
    return(
        <JoinHomeDesktop/>
    )
}

export default JoinPage;