import React,{Suspense,lazy,useState} from 'react';
import {SubscriptionArea} from '../mobile/components/SubscriptionPage'
import {getTokens} from '../../Token'
import { Layout } from 'antd';
import {TopBar} from './components/TopBar'
const { Header, Sider, Content,Footer } = Layout;

const SubscriptionPageDesktop = (props) =>{
    const[alreadyLogged,setLogged] = useState(getTokens())
    if(alreadyLogged){
        window.location.href = "/app"
    }
    return(
        <Layout style={{}}>
            <TopBar/>
            <Content style={{minHeight:"98vh"}}>
                <div>
                    <h1>Cadastro</h1>
                </div>
                <SubscriptionArea setLogged={setLogged} alreadyLogged={alreadyLogged}/>
            </Content>
            <Footer style={{textAlign:"center"}}>myHome</Footer>
        </Layout>

        
    )
}
export default SubscriptionPageDesktop;