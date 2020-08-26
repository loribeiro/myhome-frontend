import { Spin } from 'antd';
import React, { Fragment } from "react";
export const LoadingPageLite = (props) => {
    //"linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)"
    return (
        <div className="Login-Page" >
            <div style = {{}}></div>
                <div style ={{display:"grid", gridTemplateRows:"0.8fr 1.2fr 1fr"}} >
                    <div></div>
                    <div style={{textAlign:"center"}}>
                        <h1><strong>Quase lá :D</strong></h1>
                        <Spin size="large" />
                    </div>
                    <div>
                        
                    </div>
                </div>
            <div style = {{}}></div>
        </div>
    )
}