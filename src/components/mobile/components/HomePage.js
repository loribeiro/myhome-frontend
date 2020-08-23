import React,{Suspense,lazy} from 'react';
import {Button} from "antd";
import InstallPWA from './PwaInstallButton'
import Task from '../../images/tasks.png'
import Clock from '../../images/clock.png'
import Bag from '../../images/bag_green.png'
import  {DownOutlined}  from '@ant-design/icons';

export const FirstArea = (props) => {
    return(
        
        <div className = "HomePage-FirstArea" >
                <div className="Logo-Principal">
                    
                </div>
                <div>

                    <h1 style={{color:"white", marginTop:"40px"}}>
                        Tornando seu lar melhor
                    </h1>
                    <h2 style={{color:"white"}}>
                       Gratuito e Inovador.
                    </h2>
                    
                    <p style={{color:"white", margin:"2vw"}}><strong>
                        Construimos uma solução para você que compartilha o lar com amigos ou família e  
                        quer manter a organização das tarefas de casa além das contas sempre em dia.</strong>
                    </p>
                     
                     <Button href="/login"  type="danger" shape="round">Cadastro/Login</Button>  
                     <InstallPWA/>
                </div>
                <a href="#next">
                <h3 style={{color:"white"}}>
                    conheça mais!
                </h3>
                    <DownOutlined style={{fontSize: '36px', color: 'white' }}  />
                </a>
        </div>
    )
}

export const SecondArea = (props) => {
    return(
        <div HomePage-SecondArea id = "next" style = {{display:'grid', gridTemplateRows:"1fr 1fr 1fr", fontSize:"15px"}}> 
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
