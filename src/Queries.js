import gql from 'graphql-tag';

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
    }
    
    lar{
      nome
      pessoaSet{
        id
        login{
          id
          firstName
          lastName
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
      tarefasSet{
        id,
        tarefa,
        responsavel{
          id
          login{
            id
            firstName
            lastName
          }
        }
      }
    }
    
  }
}
`;
