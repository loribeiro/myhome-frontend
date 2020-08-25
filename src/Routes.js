import React,{Suspense,lazy} from 'react';
/* import { ApolloProvider } from 'react-apollo';
import { client, client2 } from './settings'; */
const HomePage= lazy(()=>import("./components/pages/HomePage")) 
const LoginPage= lazy(()=>import("./components/pages/LoginPage")) 
const SubscriptionPage= lazy(()=>import("./components/pages/SubscriptionPage"))
const AppPage= lazy(()=>import("./components/pages/AppPage")) 
const JoinPage= lazy(()=>import("./components/pages/JoinHome")) 
const Routes = {
    "/": () =><Suspense fallback={<div></div>}> <HomePage/></Suspense>,//{/* <Suspense fallback = {<LoadingPageLite/>}><HomePage/></Suspense> , */}
    "/login": () =><Suspense fallback={<div></div>}><LoginPage/></Suspense> ,
    "/cadastro": () => <Suspense fallback={<div></div>}><SubscriptionPage/></Suspense> ,
    "/app": () => <Suspense fallback={<div></div>}><AppPage/></Suspense> ,
    "/join": () => <Suspense fallback={<div></div>}><JoinPage/> </Suspense> ,
    
};

export default Routes;