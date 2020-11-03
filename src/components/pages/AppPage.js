import React,{ useState} from 'react';
import {Affix, Drawer, Collapse, Input, Layout, Menu,  Select, Tabs } from 'antd';
import {UsergroupAddOutlined,LayoutOutlined ,EllipsisOutlined,BarcodeOutlined,UnorderedListOutlined,SettingOutlined, PieChartOutlined} from '@ant-design/icons';
import {deleteTokens,getTokens} from "../../Token"
import { useDispatch } from 'react-redux';
import { Retrieve_Person} from "../../Queries"

import { useQuery} from '@apollo/client';

import {VisaoGeral,Tarefas,DadosSaude,Bens} from "../desktop/components/AppPage"
import { isMobile} from 'react-device-detect';
import {CreatingHouse,JoingHouse} from "../mobile/components/JoinPage"
import PWAPrompt from 'react-ios-pwa-prompt'
import { NavBar} from 'antd-mobile';


const { TextArea } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { TabPane } = Tabs;



const AppPage = (props) =>{
    const { loading, error, data, refetch } = useQuery(Retrieve_Person);
    
    //const storage = useSelector(state => state)
    const action = useDispatch()
    const logged = getTokens()
    
    if(logged === null){
        window.location.href = "/login"
    }
    if(loading){
        return null
    }
    if(error){
        //window.location.href = "/join"
    }
    if(data){
        console.log(data)
        if(data.pessoa[0].larUser[0] === undefined){
            window.location.href = "/join"
        }else{
        data.pessoa.map((info)=>{
            action({type:"UPDATE_PERSON", payload:{
               nome:info.login.firstName,
               sobrenome:info.login.lastName,
               idade:info.login.idade,
               administrador:info.login.isManager,
               sexo: info.login.sexo.sexo,
               saude: info.saude,
            }});
            action({type:"UPDATE_LAR",payload:{
                nome: info.larUser[0].organization.name,
                id: info.larUser[0].organization.id,
            }});
            action({type:"UPDATE_MORADORES",payload:info.larUser[0].organization.organizationUsers.map(o => o.pessoaSet.map(p => p))
            })
           
            //console.log(info.lar.organizationUsers.map(o => o.pessoaSet.map(p => p)))
            action({type:"UPDATE_TAREFAS",
            payload:info.larUser[0].organization.tarefasSet.map(t => t)
            })
            console.log(info.larUser[0].organization.tarefasSet.map(t => t))
        })
        }
        return(
            <AppPageLogic refetch = {refetch}/>
        )
    }
    return(
        <AppPageLogic/>
    )
}
export default AppPage;

const AppPageLogic = (props) =>{
    const [opcao, setOpcao] = useState(1)
    const [logged, setLogged] = useState(getTokens())
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
      };
      const onClose = () => {
        setVisible(false);
      };
    if(logged === false){
        window.location.href = "/login"
    }
    
    return (
        <Layout  style={{ minHeight: '100vh' }}>
            {
                isMobile
                ?
                <>
                <div>
                    
                <Affix offsetTop={0}>
                    <NavBar
                        style={{backgroundColor:"white"}}
                        onLeftClick={() =>showDrawer()}
                        icon = {<EllipsisOutlined  style={{textAlign:"left", fontSize:"32px"}} />}
                        
                        >
                        
                        </NavBar>
                </Affix>
                </div>
                <Drawer
                  title="myHome"
                  placement="left"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
                >
                      <Menu style={{marginTop:"10vh"}} theme="ligth" mode="inline"  onSelect={(indice)=>{setOpcao(indice.key); }} defaultSelectedKeys={['1']}>
                <Menu.Item key="1"  >
                    <LayoutOutlined />  Visão Geral
                </Menu.Item>
                <Menu.Item key="2"  >
                    <UnorderedListOutlined /> Tarefas 
                </Menu.Item>
                {/* <Menu.Item key="3" >
                    <ShoppingCartOutlined /> Compras
                </Menu.Item> */}
                <Menu.Item key="4" > 
                    <BarcodeOutlined /> Contas 
                </Menu.Item>
                <Menu.Item key="5" > 
                    <PieChartOutlined/> Inventário
                </Menu.Item>
                <Menu.Item key="6" > 
                    <SettingOutlined /> Emergência
                </Menu.Item>
                <Menu.Item key="7" > 
                <UsergroupAddOutlined /> Entrar em novo lar
                </Menu.Item>
                <Menu.Item onClick={()=>{deleteTokens(); setLogged(false)}}>
                    Sair
                </Menu.Item>
            </Menu>
                 
                </Drawer>
              </>
              :
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
                      <LayoutOutlined />  Visão Geral
                  </Menu.Item>
                  <Menu.Item key="2"  >
                      <UnorderedListOutlined /> Tarefas 
                  </Menu.Item>
                  {/* <Menu.Item key="3" >
                      <ShoppingCartOutlined /> Compras
                  </Menu.Item> */}
                  <Menu.Item key="4" > 
                      <BarcodeOutlined /> Contas 
                  </Menu.Item>
                  <Menu.Item key="5" > 
                      <PieChartOutlined/> Inventário
                  </Menu.Item>
                  <Menu.Item key="6" > 
                      <SettingOutlined /> Emergência
                  </Menu.Item>
                  <Menu.Item key="7" > 
                  <UsergroupAddOutlined /> Entrar em novo lar
                  </Menu.Item>
                  <Menu.Item onClick={()=>{deleteTokens(); setLogged(false)}}>
                      Sair
                  </Menu.Item>
              </Menu>
              </Sider>
            }
           
            <Layout>
            {
                isMobile
                ?
                null
                //<TopBar2/>
                :
                null
            }
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: "75vh" }}>
                    <ContentAbstraction opcao={opcao} refetch = {props.refetch}/>
                    <PWAPrompt copyTitle="Adicione a tela inicial!" 
                     copyBody="Este site tem funcionalidade de aplicativo. Adicione a sua tela inicial para utilizar em tela cheia e sem internet!"
                     copyShareButtonLabel ="1) Aperte o botão 'Compartilhar' "
                     copyAddHomeButtonLabel = "2) Aperte 'Adicionar a HomeScreen'"
                     />
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
            <div style={{marginTop:"2vh"}}>

                <VisaoGeral refetch = {props.refetch}/>
            </div>
        )
    }
    if(props.opcao === "2"){
        return(
            <div style={{marginTop:"2vh",textAlign:"center"}}>
                <h1>Tarefas</h1>
                <Tarefas refetch = {props.refetch}/>
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
            <div style={{marginTop:"2vh", textAlign:"center"}}>
                <h1>Adicione seus bens pessoais</h1>
                <Bens refetch = {props.refetch}/>
            </div>
        )
    }
    if(props.opcao ==="6"){
        return(
            <div style={{marginTop:"2vh", textAlign:"center"}}>
                <h1>Atualize suas informações de saúde</h1>
                <DadosSaude refetch = {props.refetch}/>
            </div>
        )
    }
    if(props.opcao === "7"){
        return(
            <div>

                {
                    isMobile
                        ?
                        <div>
                        <CreatingHouse/>
                        <JoingHouse/>
                    </div>
                    :
                    <div>
                        <CreatingHouse/>
                        <JoingHouse/>
                    </div>
                }
            </div>
        )
    }
   
    return(
        <div style={{marginTop:"10vh"}}>

        <VisaoGeral refetch = {props.refetch}/>
    </div>
    )
}