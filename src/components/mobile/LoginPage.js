import React,{Suspense,lazy, useState} from 'react';
import {LoginArea} from './components/LoginPage'
import {getTokens} from '../../Token'
const LoginPageMobile = (props) =>{
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

            <LoginArea/>

        </div>
    )
}

export default LoginPageMobile;