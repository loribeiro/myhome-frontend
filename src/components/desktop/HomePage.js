import React,{Suspense,lazy} from 'react';
import { Button,Layout } from 'antd';
import {TopBar} from './components/TopBar'
import {FirstArea,SecondArea,ThirdArea,FourthArea} from './components/HomePage'
const { Header, Sider, Content,Footer } = Layout;
const HomePageDesktop = (props) =>{
    return(
        <Layout style={{}}>
            <TopBar/>
            <Content>
                <FirstArea/>
                <ThirdArea/>
                <FourthArea/>
                <SecondArea/>
            </Content>
            <Footer style={{textAlign:"center"}}>myHome</Footer>
        </Layout>
    )
}
export default HomePageDesktop;