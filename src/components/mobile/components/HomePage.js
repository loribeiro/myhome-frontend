import React,{Suspense,lazy} from 'react';
import {Button,Image} from "antd";
import InstallPWA from './PwaInstallButton'
import Task from '../../images/tasks.png'
import Clock from '../../images/clock.png'
import Bag from '../../images/bag_green.png'
import PWAPrompt from 'react-ios-pwa-prompt'
import Logo_Branca from "../../images/page1/logo-branca.png"

import  {DownOutlined}  from '@ant-design/icons';

export const FirstArea = (props) => {
    return(
        
        <div className = "HomePage-FirstArea" >
                
                <div>

                    <h1 style={{color:"white", marginTop:"20vh", marginLeft:"15px", marginRight:"15px"}}>
                        Administre o seu lar em um só lugar.
                    </h1>
                    
                    
                    <p style={{color:"white", margin:"2vw"}}><strong>
                        Construimos uma solução para você que compartilha o lar com amigos ou família e  
                        quer manter a organização das tarefas de casa além das contas sempre em dia.</strong>
                    </p>
                     
                     <Button href="/login"  type="danger" shape="round">Cadastro/Login</Button>  
                     <InstallPWA/>
                     <PWAPrompt copyTitle="Adicione a tela inicial!" 
                     copyBody="Este site tem funcionalidade de aplicativo. Adicione a sua tela inicial para utilizar em tela cheia e sem internet!"
                     copyShareButtonLabel ="1) Aperte o botão 'Compartilhar' "
                     copyAddHomeButtonLabel = "2) Aperte 'Adicionar a HomeScreen'"
                     permanentlyHideOnDismiss={false}
                     
                     promptOnVisit={1} timesToShow={3} 
                     />
                </div>
                <div >
                    <Image src={Logo_Branca}/>
                    
                </div>
        </div>
    )
}

export const SecondArea = (props) => {
    return(
        <div HomePage-SecondArea id = "next" style = {{minHeight:"100vh",display:'grid', gridTemplateRows:"1fr 1fr 1fr", fontSize:"15px"}}> 
        {/* Comic Sans MS,Comic Sans,cursive */}
            <div style = {{display:"grid", gridTemplateColumns:"0.3fr 0.7fr",backgroundColor:"white"}}>
                <div style={{marginTop:'15px'}}>
                    <img width="100%" src = {Task}></img>
                </div>
                <div style={{marginTop:'35px', marginRight:"3px"}}>
                    <p>Liste as atividades e tarefas da casa e mantenha todos que moram com você por dentro do planejamento da semana</p>
                </div>
            </div>
            <div style = {{display:"grid", gridTemplateColumns:"0.7fr 0.3fr", borderStyle:"solid",backgroundColor:"white"}}>
                <div style={{marginTop:'35px', marginLeft:"5px"}}>
                    <p>
                        Fique atento aos prazos! Tenha sempre em mãos quando e quais contas foram pagas.
                    </p>
                </div>
                <div style={{marginTop:'35px'}}>
                    <img width="100%" src = {Clock}></img>
                </div>
            </div>
            <div style = {{display:"grid", gridTemplateColumns:"0.3fr 0.7fr",backgroundColor:"white"}}>
                <div style={{marginTop:'35px'}}>
                    <img width="100%" src = {Bag}></img>

                </div>
                <div style={{marginTop:'35px'}}>
                    <p>
                        Controle seus bens pessoais e monitore sua lista de compras.
                    </p>
                </div>
            </div>

        </div>
    )
}
