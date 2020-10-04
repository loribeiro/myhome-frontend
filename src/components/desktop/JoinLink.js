import React,{Suspense,lazy,useState} from 'react';
import {JoinArea} from '../mobile/components/JoinLink'
import {getTokens} from '../../Token'
import { Layout } from 'antd';
import {TopBar} from './components/TopBar'
const { Header, Sider, Content,Footer } = Layout;

const JoinLinkPageDesktop = (props) =>{
    const[alreadyLogged,setLogged] = useState(getTokens())
    if(alreadyLogged){
        window.location.href = "/app"
    }
    return(
        <Layout style={{}}>
            <TopBar/>
            <Content className = "Cadastro" style={{minHeight:"98vh"}}>
                
                <div style ={{marginTop:"25vh",marginLeft:"2vw", marginRight:"5vw",maxWidth:"50vw", textAlign:"center"}}>
                    <h1 style={{color:"white"}}>Preencha as informações pessoais</h1>
                    <JoinArea token = {props.token} setLogged={setLogged} alreadyLogged={alreadyLogged}/>
                </div>
            </Content>
            <Footer style={{textAlign:"center"}}>myHome</Footer>
        </Layout>

        
    )
}
export default JoinLinkPageDesktop;