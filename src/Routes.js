import React,{Suspense,lazy} from 'react';
/* import { ApolloProvider } from 'react-apollo';
import { client, client2 } from './settings'; */
import HomePage from "./components/pages/HomePage"
import AppPage from "./components/pages/AppPage"
import {LoadingPageLite} from "./GeneralComponents"
//const HomePage= lazy(()=>import("./components/pages/HomePage")) 
const LoginPage= lazy(()=>import("./components/pages/LoginPage")) 
const SubscriptionPage= lazy(()=>import("./components/pages/SubscriptionPage"))
//const AppPage= lazy(()=>import("./components/pages/AppPage")) 
const JoinPage= lazy(()=>import("./components/pages/JoinHome")) 
const Routes = {
    "/": () => <HomePage/>,//{/* <Suspense fallback = {<LoadingPageLite/>}><HomePage/></Suspense> , */}
    "/login": () =><Suspense fallback={<LoadingPageLite/>}><LoginPage/></Suspense> ,
    "/cadastro": () => <Suspense fallback={<LoadingPageLite/>}><SubscriptionPage/></Suspense> ,
    "/app": () => <AppPage/>,//<Suspense fallback={<LoadingPageLite/>}><AppPage/></Suspense> ,
    "/join": () => <Suspense fallback={<LoadingPageLite/>}><JoinPage/> </Suspense> ,
    
};

export default Routes;