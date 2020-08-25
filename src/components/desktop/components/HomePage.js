import React,{Suspense,lazy, useState} from 'react';
import {WhatsAppOutlined,SmileOutlined} from '@ant-design/icons';


export const FirstArea = (props) =>{
    return(
        <div className="Primeira-Parte" >
            <div>

            </div>
            <div style={{textAlign:"center",display:"grid",gridTemplateRows:"1fr 1fr 1fr"}}>
                <div>

                </div>
                <div>
                    <h1 style={{color:'white',fontSize:"42px"}}>Administre o seu lar em um só lugar.</h1>
                </div>
                <div>
                        <h2 style={{color:"white"}}>Divida a casa sem multiplicar os problemas. Mantenha tudo sob controle e disponivel na palma de sua mão! </h2>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}
export const SecondArea = (props) =>{
    return(
        <div className="Segunda-Parte">
            <div>

            </div>
            <div style={{textAlign:"center", marginTop:"30vh"}}>
                <h1 style={{color:"white", fontSize:"37px" }}>Experiência completa no seu celular</h1>
                <p style={{color:"white",fontSize:"18px"}}>
                    Utilize nossa plataforma tanto do seu 
                    computador quanto do celular sem perder nenhuma funcionalidade.
                    Acesse o myHome no seu celular e instale o aplicativo web para ter acesso fácil
                    as informações do seu lar, gastando o mínimo de armazenamento possível do seu aparelho
                    para que você possa utiliza-lo para armazenar muito mais lembranças felizes da sua vida!
     
                </p>
            </div>
        </div>
    )
}
export const ThirdArea = (props) =>{
    return(
        <div className="Terceira-Parte">
            <div style={{margin:"10vw"}}>
                <h1 style = {{color:"white", fontSize:"37px"}}> Administrar sua casa pelas redes sociais está se tornando dificil?</h1>
                <p style = {{color:"white", fontSize:"18px"}}>
                    Sabemos disso e construimos essa plataforma para que você não precise se estressar
                    ou se perder em grupos do Whatsapp, permitimos que você compartilhe tudo o que for
                    importante onde o resto da sua vida acontece mas assim que precisar as informações estarão salvas e organizadas aqui esperando por você.  
                </p>
                <div style={{fontSize:"35px", color:"white", marginTop:"100px"}}>
                myHome + <WhatsAppOutlined />  = <SmileOutlined />
                </div>    
            </div>
            
        </div>
    )
}
export const FourthArea = (props) =>{
    return(
        <div className = "Quarta-Parte">
            <div style={{display:"grid", gridTemplateRows:"1fr 1fr 1fr", textAlign:"center"}}>
                <div></div>
                <div></div>
                <div>
                    <h2 style={{color:"white"}}>
                        Organize e faça o planejamento das atividades e tarefas da casa que você compartilha
                        com seus colegas de forma pratica, simples e divertida.  
                    </h2>
                    
                </div>
            </div>
            <div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}