import React, { useEffect, useState } from "react";
import { Input,Button,Spin } from 'antd';
import { client2 } from "../../../settings";
import { Create_Home } from '../../../Queries';
import { isMobile} from 'react-device-detect';
import { gql, useMutation} from '@apollo/client';
import {LoadingPageLite} from "../../../GeneralComponents"
import QrReader from 'react-qr-reader'
export const CreatingHouse = (props) =>{
    const [nome, setNome] = useState("")
    const[CreateHome,
        {loading: mutationLoading, error: mutationError, data}, ] = useMutation(Create_Home);
    const handleCreation = () =>{
        
        if(nome!==""){
            CreateHome({ variables:{nome:nome}}).catch(err => {})
            
        }
    }
    if(data){
        
        window.location.href = "/app"
    }
    
    if(mutationError){
        return(
            <div>Algo deu errado, atualize a pagina e tente novamente</div>
        )
    }
    if(isMobile){

        return(
            <div style={{marginTop:"10vh"}}>
    
                <h1>Crie o seu lar</h1>
                <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                    <div>
                        <Input onChange = {value=>{setNome(value.target.value)}} name ="casa" placeholder="Nome da Casa" />
                    </div>
                    <div>
                        {
                            mutationLoading
                            ?
                            <Button type="danger" loading>Criando</Button>
                            :
                            <Button onClick = {handleCreation} type="primary">Criar Casa</Button>
                        }
                    </div>
                </div>
            </div>
        )
    }
    return(
        <div style={{marginTop:"5vh", textAlign:"center"}}>

            <h1 style={{color:"white"}}>Crie o seu lar</h1>
            <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                <div>
                    <Input onChange = {value=>{setNome(value.target.value)}} name ="casa" placeholder="Nome da Casa" />
                </div>
                <div>
                {
                            mutationLoading
                            ?
                            <Button type="danger" loading> Criando</Button>
                            :
                            <Button onClick = {handleCreation} type="primary">Criar Casa</Button>
                        }
                </div>
            </div>
        </div>
    )
}
export const JoingHouse = (props) =>{
    const [result, setResult] = useState("")
    const handleScan = data => {
        if (data) {
            window.location.href = data
          //setResult(data)
        }
      }
     const handleError = err => {
        console.error(err)
      }
    if(isMobile){
        return(
            <div style={{marginTop:"5vh"}}>
    
                <h1 >Entre em um lar já existente usando um QRCode</h1>
                <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                        />
                        <p>{result}</p>
                
                </div>
            </div>
        )
    }
    return(
        <div style={{marginTop:"5vh", textAlign:"center"}}>

            <h1 style={{color:"white"}}>Entre em um lar já existente usando um QRCode</h1>
            <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                        />
                        <p>{result}</p>
            </div>
        </div>
    )
}