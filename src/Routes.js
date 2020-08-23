import React,{Suspense,lazy} from 'react';
/* import { ApolloProvider } from 'react-apollo';
import { client, client2 } from './settings'; */
import HomePage from "./components/pages/HomePage"
import LoginPage from "./components/pages/LoginPage"
import SubscriptionPage from "./components/pages/SubscriptionPage"
import AppPage from "./components/pages/AppPage"
import JoinPage from "./components/pages/JoinHome"
const Routes = {
    "/": () => <HomePage/>,//{/* <Suspense fallback = {<LoadingPageLite/>}><HomePage/></Suspense> , */}
    "/login": () => <LoginPage/>,
    "/cadastro": () => <SubscriptionPage/>,
    "/app": () => <AppPage/>,
    "/join": () => <JoinPage/>,
    
};

export default Routes;