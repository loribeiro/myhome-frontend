import React, { useEffect, useState } from "react";
import { Input,Button } from 'antd';
import { client2 } from "../../../settings";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { Create_Home } from '../../../Queries';

export const CreatingHouse = (props) =>{
    const [nome, setNome] = useState("")
    const handleCreation = () =>{
        
        if(nome!==""){

            client2.mutate({
                mutation: Create_Home,
                variables:{nome:nome}
            }).then(
                (response)=>{
                    console.log(response)
                    window.location.href = "/app"

                }
            ).catch(err =>{})
        }
    }
    return(
        <div style={{marginTop:"10vh"}}>

            <h1>Crie o seu lar</h1>
            <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                <div>
                    <Input onChange = {value=>{setNome(value.target.value)}} name ="casa" placeholder="Nome da Casa" />
                </div>
                <div>
                    <Button onClick = {handleCreation} type="primary">Criar Casa</Button>
                </div>
            </div>
        </div>
    )
}
export const JoingHouse = (props) =>{
    return(
        <div style={{marginTop:"5vh"}}>

            <h1>Entre em um lar já existente</h1>
            <div style={{display:"grid", gridTemplateColumns:"0.95fr 0.05fr"}}>
                <div>
                    <Input placeholder="Codigo da Casa" />
                </div>
                <div>
                    <Button type="primary">Entrar em uma Casa</Button>
                </div>
            </div>
        </div>
    )
}