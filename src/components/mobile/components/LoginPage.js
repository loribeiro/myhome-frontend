import React,{Suspense,lazy, useState} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { client } from "../../../settings";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { Login_User_Query } from '../../../Queries';
import { setToken } from '../../../Token';
import {isMobile} from 'react-device-detect';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const LoginArea = (props) => {
  return (
      <ApolloProvider client = {client}>  <Login setLogged = {props.setLogged} alreadyLogged = {props.alreadyLogged}></Login>  </ApolloProvider>
  );
}

const Login = () => {
  const[LoginIn,
    { data}, ] = useMutation(Login_User_Query);
  const[entrando, setEntrando] = useState(false)

  const onFinish = (event) => {
    
    console.log('Success:', event);
    setEntrando(true)
    
    LoginIn({variables:{email:event.username , password: event.password}}).catch(err => {setEntrando(false)})
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  if(data){
    //
    setToken(data.tokenAuth);
    window.location.href = "/app"
    
 }
 if(!isMobile){
   return(
    <div style = {{marginTop:"20vh"}}>
    <div style = {{textAlign:"center"}}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="E-mail"
            name="username"
            rules={[{ required: true, message: 'Porfavor digite seu email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Porfavor digite sua senha!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Mantenha Conectado</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
          {
            entrando === false
            ?
                <Button  type="primary" htmlType="submit">
                  Entrar
                </Button>
                :
            <Button type="primary" style={{textAlign:"center", width:"200px"}} shape="round" size="large" loading>
              Entrando
            </Button>
          }
          </Form.Item>
    </Form>
    </div>
    
</div>
   )
 }
  return (
    <div >
        <div style = {{margin:"10vw"}}>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="E-mail"
                name="username"
                rules={[{ required: true, message: 'Porfavor digite seu email!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Senha"
                name="password"
                rules={[{ required: true, message: 'Porfavor digite sua senha!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Mantenha Conectado</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
              {
                entrando === false
                ?
                    <Button  type="primary" htmlType="submit">
                      Entrar
                    </Button>
                    :
                <Button type="primary" style={{textAlign:"center", width:"200px"}} shape="round" size="large" loading>
                  Entrando
                </Button>
              }
              </Form.Item>
        </Form>
        </div>
        <div style = {{textAlign:"center"}}>
          
            <Button href = "/cadastro" style = {{textAlign:"center", minWidth:"80vw", minHeight:"50px"}} type ="danger" shape="round">Cadastre-se já!</Button>
           
        </div>
    </div>
  );
};