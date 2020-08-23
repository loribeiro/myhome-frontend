import React,{Suspense,lazy, useState, useEffect} from 'react';
import { Alert, Button, Card, Collapse, Input, Layout, Menu, message, Popconfirm, Result, Select, Tabs, Tooltip, Transfer, Upload } from 'antd';
import { MobileOutlined, PieChartOutlined, QuestionCircleOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import {deleteTokens,getTokens} from "../../Token"
import { useDispatch, useSelector } from 'react-redux';
import {Get_Home_ID, Retrieve_Person} from "../../Queries"
import { client2 } from "../../settings";
import {TopBar} from "../desktop/components/TopBar"
import {VisaoGeral,Tarefas,DadosSaude,Bens} from "../desktop/components/AppPage"
import { isMobile, isTablet } from 'react-device-detect';
const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;



const AppPage = (props) =>{
    const storage = useSelector(state => state)
    const action = useDispatch()
    const logged = getTokens()
    
    if(logged === null){
        window.location.href = "/login"
    }
    useEffect(() => {
        
        client2.query(
            {
                query: Retrieve_Person,
            }
        ).then(
            (response)=>{
                if(response.data.pessoa[0].lar === null){
                    window.location.href = "/join"
                }else{
                    console.log(response.data.pessoa[0])
                    response.data.pessoa.map((info)=>{
                        action({type:"UPDATE_PERSON", payload:{
                           nome:info.login.firstName,
                           sobrenome:info.login.lastName,
                           idade:info.login.idade,
                           administrador:info.login.isManager,
                           sexo: info.login.sexo.sexo,
                        }});
                        action({type:"UPDATE_LAR",payload:{
                            nome: info.lar.nome,
                        }});
                        action({type:"UPDATE_MORADORES",payload:info.lar.pessoaSet.map(p => p)
                        })
                        action({type:"UPDATE_TAREFAS",
                        payload:info.lar.tarefasSet.map(t => t)
                        })
                    })
                }

            }
        ).catch(err => {})
    }, [])
    return(
        <AppPageLogic/>
    )
}
export default AppPage;

const AppPageLogic = (props) =>{
    const [opcao, setOpcao] = useState(1)
    const [logged, setLogged] = useState(getTokens())
    if(logged === false){
        window.location.href = "/login"
    }
    return (
        <Layout  style={{ minHeight: '100vh' }}>
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                //console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                //console.log(collapsed, type);
            }}
            style={{backgroundColor:"white"}}
            >
            <div style={{backgroundColor:"white"}} className="logo" />
            <Menu style={{marginTop:"10vh"}} theme="ligth" mode="inline"  onSelect={(indice)=>{setOpcao(indice.key); }} defaultSelectedKeys={['1']}>
                <Menu.Item key="1"  >
                    <UserOutlined />  Visão Geral
                </Menu.Item>
                <Menu.Item key="2"  >
                    <MobileOutlined /> Tarefas 
                </Menu.Item>
                <Menu.Item key="3" >
                    <UploadOutlined /> Compras
                </Menu.Item>
                <Menu.Item key="4" > 
                    <PieChartOutlined/> Contas 
                </Menu.Item>
                <Menu.Item key="5" > 
                    <PieChartOutlined/> Bens 
                </Menu.Item>
                <Menu.Item key="6" > 
                    <PieChartOutlined/> Informações Pessoais
                </Menu.Item>
                <Menu.Item onClick={()=>{deleteTokens(); setLogged(false)}}>
                    Sair
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout>
            <TopBar/>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh" }}>
                    <ContentAbstraction opcao={opcao}/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>myHome</Footer>
            </Layout>
        </Layout>
    )
}
const ContentAbstraction =(props)=>{
    if( props.opcao === "1"){
        return(
            <div style={{marginTop:"10vh"}}>

                <VisaoGeral/>
            </div>
        )
    }
    if(props.opcao === "2"){
        return(
            <div style={{marginTop:"10vh"}}>

                <Tarefas/>
            </div>
        )
    }
    if(props.opcao === "3"){
        return(
            <div>
                c
            </div>
        )
    }
    if(props.opcao ==="4"){
        return(
            <div>
                c
            </div>
        )
    }
    if(props.opcao ==="5"){
        return(
            <div style={{marginTop:"10vh", textAlign:"center"}}>

                <Bens/>
            </div>
        )
    }
    if(props.opcao ==="6"){
        return(
            <div style={{marginTop:"10vh", textAlign:"center"}}>

                <DadosSaude/>
            </div>
        )
    }
   
    return(
        <div style={{marginTop:"10vh"}}>

        <VisaoGeral/>
    </div>
    )
}