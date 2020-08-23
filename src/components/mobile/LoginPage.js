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
            <div href = "/" className="Logo-Principal">
                    
            </div>

            <LoginArea/>

        </div>
    )
}

export default LoginPageMobile;