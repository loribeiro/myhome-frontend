import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Card, Col, Divider, Drawer, Form, Input, Modal, Row, Select, Space, Steps, Tabs } from 'antd';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import {
  EmailIcon, EmailShareButton,
  WhatsappIcon, WhatsappShareButton
} from "react-share";
import { LoadingPageLite } from '../../../../GeneralComponents';
import { Is_Owner, Make_Invitation, Remove_User_Home, Turn_Adm } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

export const VisaoGeral = (props) =>{
  const storage = useSelector(state => state)
    const Despesas = (props) =>{
       return(
        <Card title="Despesas" bordered={true}>
            Despesas Totais
        </Card>
       ) 
    }
    
    const Tarefas = (props) =>{
        return(
            <Card title="Tarefas" bordered={true}>
                        Tarefas
                    </Card>
        )
    }
    if(isMobile){
        return(
          <div >
        <div style={{textAlign:"center"}}>

          <h1>Bem vindo ao lar {storage.person.lar.nome}, {storage.person.personal.nome}!</h1>
        </div>
            <div>
                <Moradores refetch = {props.refetch}/>
                <Despesas/>
                <Tarefas/>
            </div>
            </div>
        )
    }
    return(
      <div >
        <div style={{textAlign:"center"}}>

          <h1>Bem vindo ao lar {storage.person.lar.nome}, {storage.person.personal.nome}!</h1>
        </div>
        <div className="site-card-wrapper">
            <Row  gutter={{ xs: 1, sm: 16, md: 24}}>
                <Col span={8}>
                    <Moradores refetch = {props.refetch}/>
                </Col>
                <Col span={8}>
                    <Despesas/>
                </Col>
                <Col span={8}>
                    <Tarefas/>
                </Col>
            </Row>
        </div>
      </div>
    )
}


const Moradores = (props)=>{
  const storage = useSelector(state => state)
  const [visible, setVisible] = useState(false);
  const [informacoes, setInformacoes] = useState({})
  const showDrawer = (info) => {
    setVisible(true);
    setInformacoes(info)
    console.log(info)
  };
  
  const onClose = () => {
    setVisible(false);
  };
  //storage.person.moradores.map((info)=>(
  //  console.log(info)
  //  ))
  return(
      <Card title="Moradores" bordered={true}>
              {storage.person.moradores.map((info)=>(
              
                <div key={info[0].login.id} style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                  <h3 key={info[0].login.id}>{info[0].login.firstName} {info[0].login.lastName}</h3>
                  <Button size="small" style={{maxWidth:"80px"}} type="primary" onClick={()=>showDrawer(info[0])} shape="round">detalhes</Button>
                  
                  <Drawer
                    title="Informações Pessoais"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={320}
                    destroyOnClose
                  >
                    <Detalhes refetch = {props.refetch} info = {informacoes} admin = {storage.person.personal.administrador}/>
                    
                  </Drawer> 
                </div>
             
                
                  //info.map(m=> <h1>{m.id}</h1>)
              )
                  
              )}
              {
                storage.person.personal.administrador
                ? 
                <AddMoradores refetch = {props.refetch}/>
                :
                null
              }
      </Card>
  )
}
const AddMoradores = (props) =>{
  const storage = useSelector(state => state)
  const [addTask, { loading: mutationLoading, error: mutationError,data }] = useMutation(Make_Invitation);
  const dataSource = []
  const {refetch} = props
  storage.person.moradores.map((info)=>
  
  dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,id: info[0].larUser[0].id},)
  )
  
  const onFinish = values => {
    values.tasks.map(v => {
      
      addTask({ variables: { email:v.email.toLowerCase(), larId: storage.person.lar.id} })
      
    })
    refetch()
  };
  
  const onSelect = (value,info) => {
      console.log('onSelect', info.id);
  }
  if(data){
    var QRCode = require('qrcode.react');
    const modal = Modal.success({
      title: 'Agora é só compartilhar o convite!',
      content: <div style={{textAlign:"center", display:"grid", gridAutoRows:"1fr 1fr"}}>
        <div>
          <h2 style={{textAlign:"left"}}>- Por QrCode:</h2>
          <QRCode value={data.makeInvitation.Token} />
        </div>
        <div>
          <h2 style={{textAlign:"left"}}>- Ou pelas rede sociais:</h2>
        
          <WhatsappShareButton  url={data.makeInvitation.Token} title="Faça parte do nosso lar!">
            <div style={{display:"grid", gridTemplateRows:"1fr 1fr"}}>
              <div>

                <WhatsappIcon size={42} round /> 
              </div>
              <div>
                Whatsapp
              </div>
            </div>
          </WhatsappShareButton>
          <EmailShareButton  style={{marginLeft:"30px"}} url={data.makeInvitation.Token} 
          subject={"Convite para participar do lar " + storage.person.lar.nome} 
          body={"Você foi convidado para participar do lar "+storage.person.lar.nome +" por " 
          + storage.person.personal.nome +" "+ storage.person.personal.sobrenome + 
          ". Acesse o link abaixo e comece a interagir com seus colegas"} 
          title="Faça parte do nosso lar!">
            <div style={{display:"grid", gridTemplateRows:"1fr 1fr"}}>
              <div>

                <EmailIcon  size={42} round> </EmailIcon> 
                
              </div>
              <div>
                Email
              </div>
            </div>
          </EmailShareButton>
        </div>
        </div> ,
    });
    //modal.destroy();
    console.log(data.makeInvitation.Token)
    
  }
  if(mutationLoading){
    return(
      <div>
        criando
      </div>
    )
  }
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="tasks">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map(field => (
                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                  <Form.Item
                    {...field}
                    name={[field.name, 'email']}
                    fieldKey={[field.fieldKey, 'email']}
                    rules={[{ required: true, message: 'Faltando e-mail' }]}
                  >
                    <Input placeholder="E-mail" />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  block
                >
                  <PlusOutlined /> Adicionar Morador
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item style= {{textAlign:"center"}}>
        <Button type="primary" htmlType="submit">
        Gerar Convite
        </Button>
      </Form.Item>
    

     {/* {
       data
       ?
       <QrCodePresenter token = {data.makeInvitation.Token}/>
       :
       null
     } */}
    </Form>
  );
}
const QrCodePresenter = (props) =>{
  var QRCode = require('qrcode.react');
  return(
    <Modal
    title="Basic Modal"
    visible={true}
    onOk={()=> false}
    onCancel={()=>false}
    destroyOnClose
  >
  <QRCode value={props.token} />
  </Modal>
  )
}
const Detalhes = (props)=>{
  const storage = useSelector(state => state)
  const [removeUser, { loading: mutationLoading, error: mutationError,data }] = useMutation(Remove_User_Home);
  const [addAdmin, { loading: mutationLoading2, error: mutationError2,data: mutationData2 }] = useMutation(Turn_Adm);
  const { loading, error, data: data2} = useQuery(Is_Owner,{variables:{larId: storage.person.lar.id}});
  const {refetch} = props
  if(data || data2){
    refetch()
  }
  if(mutationLoading2|| mutationLoading){
    return(
      <LoadingPageLite/>
    )
  }
  if(props.info.login.firstName !== null){
    
    return(
      <div>
        <Divider>Informações Básicas</Divider>
        <p><strong>Nome: </strong>{props.info.login.firstName} {props.info.login.lastName }</p>
        <p><strong>Alergias: </strong>{props.info.saude.alergias} </p>
        <p><strong>Restrições Alimentares: </strong>{props.info.saude.restricoesAlimentares}</p>
        <p><strong>Plano de Saude: </strong>{props.info.saude.plano}</p>
        <Divider>Contatos de Emergência</Divider>
        {props.info.saude.contatoEmergencia.map(contato =>(
          <div key={contato}>
            <p><strong>Nome:</strong> {contato.nome}</p>
            <p><strong>Numero:</strong> {contato.numero}</p>
            <Divider></Divider>
          </div>
        ))}
        {
          props.admin
          ?
          <div style={{textAlign:"center"}}>
            <Button onClick = {()=>{
              removeUser({variables:{email:props.info.login.username, larId:storage.person.lar.id}})
              
            }} shape="round" type="danger">Remover da Casa</Button>
          </div>
          :
          null
        }
        {
          data2
          ?
          ((data2.isOwner && (props.info.larUser.find(u => u.organization.id === storage.person.lar.id ).isAdmin=== false)) 
            ?
            <div style={{textAlign:"center"}}>
               <br></br>
            <Button type="primary" onClick = {()=>{addAdmin({variables:{larId: storage.person.lar.id , admId: props.info.larUser.find(u => u.organization.id === storage.person.lar.id ).id }})}}>
              Tornar Administrador
            </Button>
            </div>
            :
            null)
            :
            null
        }
      </div>
    )
  }
  return(<div></div>)
}