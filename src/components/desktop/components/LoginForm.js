import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Login_User_Query } from '../../../Queries';
import { useMutation } from '@apollo/client';
import { setToken, getTokens } from '../../../Token';
export const HorizontalLoginForm = (props) => {
  const [form] = Form.useForm();
  const[LoginIn,
    { data,error,loading}, ] = useMutation(Login_User_Query);
  const [, forceUpdate] = useState();

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);
  const openNotification = () => {
    notification.open({
      message: 'Email ou senha errados',
      description:
        'Verifique se seu email ou senha foram digitados corretamente',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  const onFinish = values => {
    console.log('Finish:', values);
    LoginIn({variables:{email:(values.username).toLowerCase() , password: values.password}}).catch(err => openNotification())
  };
  if(data){
    setToken(data.tokenAuth);
    if(props.link){
      (props.setLogged)(getTokens())
    }else{
      window.location.href = "/app"
    }
  }
  
  
  return (
    <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Por favor digite seu e-mail!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor digite sua senha!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {
          loading
          ?
          <Button type="primary" loading>Entrando</Button>
          :

        () => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Entrar
          </Button>
        )
        }      
      </Form.Item>
    </Form>
  );
}

