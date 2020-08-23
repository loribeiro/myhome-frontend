import React, { useEffect, useState } from "react";
import {JoingHouse,CreatingHouse} from "./components/JoinPage"
export const JoinArea = (props) =>{
    return(
        <div>
            <div href = "/" className="Logo-Principal">
                    
            </div>
            <CreatingHouse/>
            <JoingHouse/>
        </div>
    )
}