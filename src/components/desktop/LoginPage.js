import React,{Suspense,lazy} from 'react';
import {TopBar} from './components/TopBar'
import { Layout } from 'antd';
import {LoginArea} from "../mobile/components/LoginPage"
const { Header, Sider, Content,Footer } = Layout;

const LoginPageDesktop = (props) =>{
    return(
        <Layout style={{}}>
            <TopBar/>
            <Content >
                <Login/>        
            </Content>
            <Footer style={{textAlign:"center"}}>myHome</Footer>
        </Layout>
    )
}
export default LoginPageDesktop;

const Login = (props) =>{
    return(
        <div className="Login" style={{textAlign:"center",display:"grid", gridTemplateColumns:"1fr 1fr 1fr", minHeight:"95vh"}}>
                        <div style= {{marginTop:"15vh"}}>
                            
                            <LoginArea/>
                            
                        </div>
                        <div></div>
                        <div></div>
            </div>
        
    )
}