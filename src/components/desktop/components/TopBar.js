import React,{Suspense,lazy} from 'react';
import { Button,Layout ,Menu} from 'antd';
import Logo from "../../images/logo.png"
import {HorizontalLoginForm} from "./LoginForm"
const { Header} = Layout;
const { SubMenu } = Menu;
export const TopBar = (props) =>{
    return(
        <Header className="header" style={{backgroundColor:"white", position: 'fixed', zIndex: 1, width: '100%' }}>
            
            <Menu theme="light" mode="horizontal" style={{textAlign:"left"}} >       
                <Menu.Item  key="1">
                            <div  className = 'Grid-Logo' style = {{/* background:props.color */}}>
                                <div>
                                    <a href= '/'>
                                        <img src={Logo} width = {"100px"} height = {"50px"} />
                                        
                                    </a>
                                </div>                               
                                
                            </div>
                </Menu.Item>
                <Menu.Item key="2">Blog</Menu.Item>
                <Menu.Item key="3"><a href="/cadastro">Cadastro</a></Menu.Item>
                <Menu.Item key="4" style={{marginLeft:"20vw", marginBottom:"15px"}}><HorizontalLoginForm/></Menu.Item>
            </Menu>
         </Header>
    )
}
export const TopBar2 = (props) =>{
    return(
        <Header className="header" style={{backgroundColor:"white", textAlign:"center", position: 'fixed', zIndex: 1, width: '100%' }}>
         <a href = "/">

            <div  className="Logo-Barra">
                    
            </div>
        </a>
        </Header>
    )
}