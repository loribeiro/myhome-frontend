import React,{Suspense,lazy, useState} from 'react';
import {getTokens} from '../../Token'
import {LoginArea} from './components/LoginPage'
import { useMutation} from '@apollo/client';
import {LoadingPageLite} from "../../GeneralComponents"
import { Accept_invitation_Existent_User  } from '../../Queries';
import { Result, Button, Typography } from 'antd';
import {HorizontalLoginForm} from "../desktop/components/LoginForm";
import { CloseCircleOutlined } from '@ant-design/icons';

const JoinLinkExistentPageMobile = (props) => {
    const [acceptInv, { loading: mutationLoading, error: mutationError,data }] = useMutation(Accept_invitation_Existent_User);
    const[alreadyLogged,setLogged] = useState(getTokens())
    if(alreadyLogged){
        acceptInv({variables:{token:props.token}}).catch(err =>console.log(err))
       
    }
    if(mutationLoading){
        return(
            <LoadingPageLite/>
        )
    }
    if(mutationError){
        return(
            <Result
                status="error"
                title="Falha na autenticacao do link"
                subTitle="Por favor peca para o admistrador do seu lar gerar um novo link"
                extra={[
                <Button href="/app" type="primary" key="console">
                   Voltar ao App
                </Button>,
                
                ]}
            >
                
            </Result>
        )
    }
    if(data){
        return(
            <Result
                status="success"
                title="Sua solicitacao foi completada com sucesso!"
                subTitle="Agora voce ja tem acesso ao novo lar!"
                extra={[
                <Button href="/app" type="primary" key="console">
                    Voltar para o App
                </Button>,
                
                ]}
            />
        )
    }
        return(
            <div style={{textAlign:"center"}}>
                <h1>Quase lá!</h1>
                <h2>Faca o login para entrar no novo lar.</h2>
                <HorizontalLoginForm/>
            </div>
        )
    
    
    
}
export default JoinLinkExistentPageMobile;