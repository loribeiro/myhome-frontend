import React,{Suspense,lazy, useState} from 'react';
import {SubscriptionArea} from './components/SubscriptionPage'
import {getTokens} from '../../Token'
const SubscriptionPageMobile = (props) =>{
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
                <SubscriptionArea setLogged={setLogged} alreadyLogged={alreadyLogged}/>
            </div>

        </div>
    )
}

export default SubscriptionPageMobile;