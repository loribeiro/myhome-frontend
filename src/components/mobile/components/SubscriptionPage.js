import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { AutoComplete, Button, Card, Checkbox, Form, Input, Layout, Select } from 'antd';
import MaskedInput from 'antd-mask-input';
import FormItem from "antd/lib/form/FormItem";
import React, { useEffect, useState } from "react";
import { client } from "../../../settings";
import { Create_Person, Login_User_Query } from '../../../Queries';
import { getTokens, setToken } from '../../../Token';

const { Meta } = Card;
const { Header, Content, Footer } = Layout;
const InputGroup = Input.Group;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const desc = ['Pessimo', 'Ruin', 'Normal', 'Bom', 'Maravilhoso'];
export const SubscriptionArea = (props) => {
    return (
        <ApolloProvider client = {client}>  <FormRegistration2 setLogged = {props.setLogged} alreadyLogged = {props.alreadyLogged}></FormRegistration2>  </ApolloProvider>
    );
}
export const FormRegistration2 = (props) =>{
      const[sendData,
        {loading: mutationLoading, error: mutationError}, ] = useMutation(Create_Person);
      
      const [inputs, setInputs] = useState({});
      
      const[LoginIn,
           { data}, ] = useMutation(Login_User_Query);
     const[proximo, setProximo] = useState(false)
     const[isSubscribing, setIsSubscribing] = useState(false);
     let  subscribing = false;
     let  hasAccount = false;
     const [differentPasswords , setDifferentPasswords] = useState(false)
     const[ checkTheCheckbox, setCheckCheckbox] = useState(true);
     const handleSubmit = (event) => {
         console.log(event)
          /* if (event) {
             event.preventDefault(); */ 

             if (inputs.password === inputs.password2 && inputs.checkbox === true && ((inputs.sobrenome!=="" || inputs.sobrenome !== undefined) &&(inputs.nome!=="" || inputs.nome !== undefined) &&(inputs.email!=="" || inputs.email !== undefined) && (inputs.senha!=="" || inputs.senha !== undefined) && (inputs.sexo !=="" || inputs.sexo !== undefined) ) ){
                
                setIsSubscribing(true); 
                sendData({variables:{nome:inputs.nome, sobrenome: inputs.sobrenome,email:inputs.email , senha: inputs.password , sexo: inputs.sexo}}).catch(err => {})
                 
            }else{
                
                subscribing = false;
                 if(inputs.password === inputs.password2){
                    setCheckCheckbox(false);
                    //
                 }else{
                     setDifferentPasswords (true);
                     //
                 }
             }
         // }
     }
     const handleNext = (event) => {
         if(event){
            event.preventDefault();
            if (((inputs.sobrenome!=="" && inputs.sobrenome !== undefined) &&(inputs.nome!="" && inputs.nome != undefined) &&(inputs.email!="" && inputs.email != undefined))){
              setProximo(true)
                
           }
         }
     }
     const handleInputChange2 = (event) => {
        
        setInputs(inputs => ({...inputs, [event.target.name]: event.target.checked}));
        setCheckCheckbox(event.target.checked);
     }
     const handleInputChange3 = (value) =>{
         setInputs(inputs => ({...inputs, ["sexo"]: value}));
     }
     const handleInputChange = (event) => {
         event.persist();
         setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
         if(event.target.name ==="email" ){
             //
             hasAccount = false
             setIsSubscribing(false)
         }  
         if(event.target.name === "password2"){
             if(inputs.password === event.target.value){
                 //
                setDifferentPasswords (false);
             }else{
                 setDifferentPasswords(true)
             }
         }
         if(event.target.name === "password"){
            if(inputs.password2 === event.target.value){
               setDifferentPasswords (false);
            }else{
                setDifferentPasswords(true)
            }
        }
        }
       useEffect(()=>{
            //
       });
       const makingLogin = () => {
            LoginIn({variables:{email:inputs.email , password: inputs.password}}).catch(err => {})
            
       }
     //if (mutationLoading) return <div>loading</div>;
     /* if(mutationLoading){
         return <h1>Carregando!!</h1>
     } */
     if (mutationError){
         //
        subscribing =false
        hasAccount = true;
     } //return <div>Error: {JSON.stringify(mutationError)}</div>
    if(data){
        //
        setToken(data.tokenAuth);
     }
     //
     return(
         <div style={{ textAlign:"center"}}>
                <Form onFinish={handleSubmit}>
                    <Form.Item hidden = {proximo}>

                        <Form.Item >
                            <Input className = "inputEmail" onChange = {handleInputChange} name = "nome"  placeholder= "Nome"/>

                        </Form.Item>
                        <Form.Item >
                            <Input className = "inputEmail" onChange = {handleInputChange} name = "sobrenome"  placeholder= "Sobrenome"/>

                        </Form.Item>             
                        <Form.Item >
                            <Input className = "inputEmail" onChange = {handleInputChange} name = "email"  placeholder= "E-mail"/>
                                {(hasAccount === true && isSubscribing === true) ? <h5 style = {{color:"red", textAlign:"center"}}>Email já cadastrado!</h5> : <div></div>}
                        </Form.Item>
                        <Form.Item>

                            <Button type="danger" style={{ width:"200px"}} shape="round" size="large" onClick={handleNext}>
                                Proximo
                            </Button>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item hidden = {!proximo}>
                        
                        <FormItem hasFeedback>
                            <Input.Password onChange = {handleInputChange} name = "password"  placeholder="Senha"/>
                        </FormItem>
                        <FormItem hasFeedback>
                            <Input.Password  onChange = {handleInputChange} name = "password2" placeholder="Confirme a Senha"  />
                            {differentPasswords === true ? <h5 style = {{color:"red", textAlign:"center"}}>Senhas diferentes</h5> : null}
                        </FormItem>
                        <Form.Item >
                            <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Selecione seu sexo"
                                    optionFilterProp="children"
                                    name = "sexo"
                                    onChange={handleInputChange3}
                                    filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Feminino">Feminino</Option>
                                    <Option value="Masculino">Masculino</Option>
                                    <Option value="Outro">Outro</Option>
                                </Select>
                            </Form.Item>
                        <Form.Item >
                            <Checkbox  onChange = {handleInputChange2} name = "checkbox">
                                Li e aceito os <a href="/contract" target="_blank">Termos e Condições</a>
                            </Checkbox>
                            {checkTheCheckbox === false ? <h5 style = {{color:"red", textAlign:"center"}}>Você precisa concordar com os Termos e condições marcando o checkbox</h5>: null}
                        </Form.Item>
                        <Form.Item >
                            { (subscribing === false  && (isSubscribing === false || hasAccount ===true))
                                    ?
                                <Button 
                                    onClick={()=>{ 
                                        subscribing = true;
                                        handleSubmit();
                                        setInterval(()=>{(props.setLogged)(getTokens())},2000 );
                                        setTimeout(() => {
                                            if( inputs.password === inputs.password2){
                                                
                                                makingLogin();
                                            }
                                        }, 3500); 
                                        }} 
                                    onChange = {handleInputChange} 
                                    htmlType="submit"  
                                        /*  onChange={this.handleChange} */ type="danger"  
                                    style={{width:"200px"}} shape="round" size="large" >
                                
                                    Cadastre-se
                                
                                </Button>
                                :
                                <Button type="primary" style={{backgroundColor:"red", width:"200px"}} shape="round" size="large" loading>
                                    Cadastrando
                                </Button>
                            } 
                        </Form.Item>
                        
                    </Form.Item>
                </Form>
         </div>
         
     );
 
 
 };