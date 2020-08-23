//Configurações do Appolo para conectar com a api django
import ApolloClient, { gql, HttpLink } from "apollo-boost";
import {getTokens} from "./Token"
import { ApolloLink, concat } from 'apollo-link';


export const client2 = new ApolloClient({
  uri: "http://localhost:8001/graphql/",
  //uri:"https://linkkinbackend.herokuapp.com/graphql/",
  request: (operation) => {
    const token = getTokens()/* localStorage.getItem('token') */
    //console.log("este é o token")
    //console.log(token.token)
    operation.setContext({
      headers: {
        //"x-access-token": token.token,
        authorization: token ? 'JWT '+token.token : ''
      }
    })
  }
})

 export const client = new ApolloClient({
    uri: "http://localhost:8001/graphql/"
    //uri:"https://linkkinbackend.herokuapp.com/graphql/"
    // credentials: "no-cors"
  }); 

  //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZ…Q3NX0.AhNH-XZNaBNEjMuTyq7NDLqBurY_xOxI5PhV6CyvpNc

  /* const httpLink = new HttpLink({uri: 'http://localhost:8001/graphql/'});

const authMiddleware = new ApolloLink ((operation,forward)=>{
  const token = getTokens()
  operation.setContext({
    headers: {
      authorization: token.token || null,
    }
  });
  return forward(operation);
});
export const client2 = new ApolloClient({
  link: concat(authMiddleware, httpLink)
}); */