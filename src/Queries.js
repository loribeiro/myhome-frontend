import gql from 'graphql-tag';

export const Remove_User_Home = gql `
mutation RemoveUser($email: String!, $larId: String!){
  removeUser(usuario: $email, larId: $larId){
    Lar{
      id
    }
  }
}

`;
export const Accept_invitation_Existent_User = gql `
mutation ExistentUserInvitation($token: String!){
  acceptInvitationExistentUser(token: $token){
    Pessoa{
      id
    }
  }
}
`;
export const Accept_ivitation = gql `
mutation acceptInvitation($password: String!,$token: String!, $sexo: String!,$nome: String!, $sobrenome: String!){
  acceptInvitation(nome:$nome, sobrenome:$sobrenome, password:$password, sexo:$sexo,token:$token){
   Pessoa{
     login{
       lastName
     }
     larUser{
       id
     }
   }
 }
 }
`;

export const Make_Invitation = gql `
mutation makeInvitation($email: String!, $larId: String!){
  makeInvitation(email:$email,larId: $larId){
    Token
  }
}
`;

export const Create_Person= gql`
mutation criarPessoa($nome: String!, $sobrenome: String!, $email: String! , $sexo: String!, $senha:String!){
  createPessoa(nome:$nome,sobrenome:$sobrenome, email:$email, senha: $senha,sexo:$sexo){
    Pessoa{
      id
      
    }
  }
}
`;
export const Login_User_Query = gql `
mutation tokenAuth($email: String!, $password: String!){
  tokenAuth(username: $email , password: $password){  
      token
  }
  }
`;
export const Create_Home = gql `
mutation CreateLar($nome: String!){
  createLar(nome:$nome){
    Lar{
      id
    }
  }
}`;
export const Get_Home_ID = gql`
query{
  pessoa{
    lar{
      id
    }
  }
}
`;

export const Create_Task = gql `
mutation CreateTarefas($responsavel: String!, $tarefa: String!){
  createTarefas(responsavel:$responsavel, tarefa:$tarefa){
    Tarefas{
      id
    }
  }
}
`; 

export const Retrieve_Person =  gql `
query{
  pessoa{
    
    login{
     isManager
     sexo{
       sexo
     }
     idade
     hasHouse
     firstName
     lastName
     username
   }
   saude{
     alergias
     contatoEmergencia{
       id
       nome
       numero
     }
     temPlano
     plano
     restricoesAlimentares
   }
   
   larUser{
     id
     isAdmin
     organization{
       id
       name
     slug
     organizationUsers{
       
         pessoaSet{
           id
           larUser{
             id
             isAdmin
             organization{
              id
            }
           }
           login{
             id
             firstName
             lastName
             username
           }
           itensSet{
             id
             objeto
             
           }
           saude{
             alergias
             contatoEmergencia{
               nome
               numero
             }
             temPlano
             plano
             restricoesAlimentares
           }
         }
       
     }
     tarefasSet{
       id,
       tarefa,
       responsavel{
         id
         user{
           id
           firstName
           lastName
         }
       }
     }
     }
   }
 }
}
`;
export const Create_Bem = gql `
mutation createBens($objeto: String!, $pessoa: String!){
  createBens(objeto:$objeto,pessoa:$pessoa){
    Bens{
      objeto
    }
  }
}
`;
export const Create_Contato = gql `
mutation createContato($nome: String!, $numero: String!){
  createContato(nome:$nome,numero:$numero){
    Contato{
      nome
      numero
    }
  }
}
`;
export const Create_Saude = gql `
mutation createSaude($alergias: String!, $temPlano: Boolean!,$plano: String!, $restricoesAlimentares: String!){
  createSaude(alergias:$alergias, temPlano:$temPlano,plano:$plano, restricoesAlimentares:$restricoesAlimentares){
    Saude{
      id
    }
  }
}
`;
export const Delete_Tarefas = gql `
mutation DeleteTarefas($tarefa: String!){
  deleteTarefas(tarefa:$tarefa){
    Tarefas{
      id
    }
  }
}
`;
export const Update_Saude = gql `
mutation updateSaude($alergias: String!, $plano: String!, $temPlano: Boolean!,$restricoesAlimentares: String! ){
  updateSaude(alergias:$alergias, plano:$plano, temPlano:$temPlano,restricoesAlimentares:$restricoesAlimentares ){
    Saude{
      id
    }
  }
}`;
