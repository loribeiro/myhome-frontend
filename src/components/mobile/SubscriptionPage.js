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
            <div href="/" className="Logo-Principal">
                    
            </div>

            <SubscriptionArea setLogged={setLogged} alreadyLogged={alreadyLogged}/>

        </div>
    )
}

export default SubscriptionPageMobile;