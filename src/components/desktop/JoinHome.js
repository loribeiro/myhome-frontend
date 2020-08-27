import React,{Suspense,lazy} from 'react';
import { Layout } from 'antd';
import {TopBar} from './components/TopBar'
import {CreatingHouse,JoingHouse} from '../mobile/components/JoinPage'
const { Header, Sider, Content,Footer } = Layout;
const JoinHomeDesktop = (props) =>{
    return(
        <Layout style={{}}>
        <TopBar/>
        <Content className = "Login" style={{minHeight:"98vh"}}>
            
            <div style ={{marginTop:"25vh",marginLeft:"2vw", marginRight:"5vw",maxWidth:"50vw", textAlign:"center"}}>
                <h1 style={{color:"white"}}>Ainda não tem um lar para chamar de seu?</h1>
                <h1 style={{color:"white"}}>Peça para o administrador da sua casa um codigo ou crie uma casa agora mesmo!</h1>
                <CreatingHouse/>
                <JoingHouse/>
            </div>
        </Content>
        <Footer style={{textAlign:"center"}}>myHome</Footer>
    </Layout>
    )
}
export default JoinHomeDesktop;