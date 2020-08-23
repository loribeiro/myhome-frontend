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
        <div style={{textAlign:"center",display:"grid", gridTemplateRows:"0.1fr 0.9fr"}}>
            <div>
                <h1 style={{marginTop:"10vh"}}>Faça o login na nossa plataforma!</h1>

            </div>
            
            <div className="Login" style={{textAlign:"center",display:"grid", gridTemplateColumns:"1fr 1fr 1fr", minHeight:"95vh"}}>
                        <div>
                            <LoginArea/>
                        </div>
                        <div></div>
                        <div></div>
            </div>
        </div>
    )
}