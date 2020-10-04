import React,{Suspense,lazy, useState} from 'react';
import {JoinArea} from './components/JoinLink'
import {getTokens} from '../../Token'
const JoinLinkPageMobile = (props) =>{
    const[alreadyLogged,setLogged] = useState(getTokens())
    if(alreadyLogged){
        window.location.href = "/app"
    }
    return(
        <div>
            <a href = "/">

                <div  className="Logo-Principal">
                        
                </div>
            </a>
            <div style={{margin:"10%", textAlign:"center"}}>
                <h1>Preencha as informações a seguir!</h1>
                <JoinArea token = {props.token} setLogged={setLogged} alreadyLogged={alreadyLogged}/>
            </div>

        </div>
    )
}

export default JoinLinkPageMobile;