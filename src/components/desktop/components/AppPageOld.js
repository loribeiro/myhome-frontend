import React,{ useState, useEffect} from 'react';
import {Table,Tabs ,Card, Col, Row } from 'antd';
import {Steps,Result,InputNumber,Select,List,message,Drawer,Switch,Popconfirm ,Form,Divider ,Input, Button, Space ,AutoComplete,notification, Modal} from 'antd';
import { MinusCircleOutlined, PlusOutlined,ExclamationCircleOutlined  } from '@ant-design/icons';
import {isMobile} from 'react-device-detect';
import CurrencyInput from 'react-currency-input';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation, useQuery } from '@apollo/client';
import {Create_Registro_Conta_Fixa,Create_Registro_Conta_Variavel,Turn_Adm,Change_Owner,Is_Owner,Remove_User_Home,Make_Invitation,Create_Task,Delete_Tarefas,Create_Bem,Create_Contato,Update_Saude, Create_Conta_Fixa} from "../../../Queries"
import { updateSaude } from '../../../store/reducers/personal_data_reducers';
import Sider from 'antd/lib/layout/Sider';
import { OmitProps } from 'antd/lib/transfer/ListBody';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon
} from "react-share";
import { LoadingPageLite } from '../../../GeneralComponents';
import FormItem from 'antd/lib/form/FormItem';

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

export const Contas = (props) =>{
  const [deleteTask, { loading: mutationLoading, error: mutationError,data }] = useMutation(Delete_Tarefas);
  const storage = useSelector(state => state)
  
  const {refetch} = props
  
  
    const expandedRowRender = () => {
      const columns = [
        { title: 'Morador', dataIndex: 'morador', key: 'morador' },
        { title: 'Valor', dataIndex: 'valor', key: 'valor' },
         
      ];
  
      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

  return(
    <div style={{textAlign:"center"}}>
        <h1>Acompanhe e adicione as contas do lar</h1>
       <ContasFixas refetch={props.refetch}/>
       <ContasVariaveis refetch={props.refetch}/>
           
    </div>
  )
}

const ContasFixas = (props)=>{
  const storage = useSelector(state => state)
  const data_table_fixa = []
  const dataSource = []
  const [visible, setVisible] = useState(false)
  const columns = [
    { title: 'Conta', dataIndex: 'conta', key: 'conta' },
    
    {
      title: 'Dia do Vencimento',
      dataIndex: 'vencimento',
      key: 'vencimento',
    },
  ];
  storage.person.moradores.map((info)=>
    dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,
    id: info[0].larUser.find(u => u.organization.id === storage.person.lar.id ).id},)
    )
  storage.person.contasFixas.map(c =>{
    data_table_fixa.push({
      key:c.id,
      conta: c.nome,
      vencimento:c.vencimento,
      description:<ContaIntTable moradores={dataSource} informacoes={c.informacoescontafixaSet}/>
    },)
  })
  
  return(
    <div>
      <h1>Contas Fixas</h1>
    <Table
    columns={columns}
    expandable={{
      expandedRowRender: record =><div> {record.description}</div>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data_table_fixa}
    pagination={false}
    scroll = {{ y: 240 }}
/>
<Button type="primary" htmlType="submit" onClick={() => setVisible(true)}>
            Adicionar Conta Fixa
          </Button>
          <Modal
          title="Adicionar Conta"
          footer = {null}
          visible = {visible}
          
          destroyOnClose
        >
<AddContaFixa setVisible = {setVisible} refetch={props.refetch} moradores = {dataSource} larId = {storage.person.lar.id}/>
</Modal>
    </div>
  )
}
const ContaIntTable = (props) =>{
  const data_table_fixa = []
  const columns = [
    { title: 'Nome', dataIndex: 'nome', key: 'nome' },
    
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },
  ];
  props.informacoes.map(c =>{
    
     data_table_fixa.push({
      key:c.id,
      nome: props.moradores.find( m => m.id === c.responsavel.id).value,
      valor:"R$"+c.valor,
      
    },)
  })
  return(
    <Table
    columns={columns}
   
    dataSource={data_table_fixa}
    pagination={false}
    //scroll = {{ y: 240 }}
/>
  )
}
const AddContaFixa = (props) => {
  const [createConta, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Conta_Fixa);
  const [createRegistro, { loading: mutationLoading2, error: mutationError2,data: data2 }] = useMutation(Create_Registro_Conta_Fixa);
  //const []
  const [conta, setConta ] = useState("")
  const [date, setDate ] = useState("5")
  const [valor, setValor] = useState(0)
  const [current, setCurrent] = React.useState(0);
  const {refetch} = props
  function handleChange(value) {
    console.log(`selected ${value}`);
    setConta(value)
  }
  function onChange(value) {
    //console.log(date, dateString);
    setDate(value.toString())
  }
  const next = () => {
    if(current === 0 && date !=="" && conta !==""){
      createConta({variables:{nome: conta, vencimento:date, larId:props.larId}})
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onNumberChange = value => {
    
  };
  const onFinish = values => {
   //console.log(values)
   //console.log(data.createContaFixa.Contas.id)
   for (const [key, value] of Object.entries(values.contas)) {
    createRegistro({variables:{contaId:data.createContaFixa.Contas.id,responsavelId:key.toString(), valor: value.valor.split('$')[1].replace('.','').replace(',','.')}})
    console.log(`${key}:`, value.valor.split('$')[1].replace('.','').replace(',','.'));
   
    
  }
      
    refetch()
  };
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
  };
  const steps = [
    {
      title: 'Escolher Conta',
      content: <div>
        <Form  name="dynamic_form_nest_item" preserve={false} autoComplete="off">
        <Space direction="vertical">
        <Form.Item
          
          //rules={[{ required: false, message: 'Faltando Tarefa' }]}
          label="Conta"
          
        >
           <Select  defaultValue="" style={{ width: 120 }} onChange={handleChange}>
              <Option value="Aluguel">Aluguel</Option>
              <Option value="Internet">Internet</Option>
              <Option value="Luz">Luz</Option>
              <Option value="Condominio">Condominio</Option>

           </Select>
           </Form.Item>
           <Form.Item
          
          //rules={[{ required: false, message: 'Faltando Tarefa' }]}
          label="Vencimento(dia)"
          
          >

           <InputNumber min={1} max={30} defaultValue={5} onChange={onChange} />
        </Form.Item>
        <Button type="primary"  onClick={() => {
          if(current === 0 && date !=="" && conta !==""){
            createConta({variables:{nome: conta, vencimento:date, larId:props.larId}})
            setCurrent(current + 1);
          }
        }}>
            Proximo
          </Button>
        </Space>
        </Form>
      </div>,
    },
    {
      title: 'Adicionar contribuições',
      content: <div>
         <Form preserve={false} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
         <Form.List name="contas">
         {fields => (
           <div>
              {
                props.moradores.map(m=>(
                  <Form.Item
          {...formItemLayout}
          {...m}
          name={[m.id, 'valor']}
                        fieldKey={[m.id, 'valor']}
          initialValue = {"R$0"}
                        rules={[{ required: false, message: 'Defina um valor' }]}
          label={m.value}
          //validateStatus={number.validateStatus}
          //help={number.errorMsg || tips}
        >
          <CurrencyInput decimalSeparator = "," thousandSeparator = "." 
                                          allowEmpty = {false}  inputType="tel" prefix="R$"
                                          //onChangeEvent = {(event, maskedvalue, floatvalue)=>{setValor(floatvalue);}}
                                          />

        </Form.Item>
                
                ))
              }
              </div>
              )}
         </Form.List>
          
            <Button type="primary" htmlType="submit" onClick={() => message.success('Processing complete!')}>
            Concluir
          </Button>
            
         </Form>
      </div>,
    },
  ];
  if(mutationLoading){
    return(
      <h1>Carregando</h1>
    )
  }
  if(data2){
    return(
      <Result
    status="success"
    title="Conta adicionada com sucesso"
    
    extra={[
      <Button type="primary" key="console" onClick={()=>(props.setVisible(false))}>
       Fechar
      </Button>,
      
    ]}
  />
    )
  }
  return (
    <>
      <Steps direction={isMobile ? "vertical" : "horizontal"} current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current === 0 
        ?
        <Button type = "danger" onClick={()=>(props.setVisible(false))}> Cancelar</Button>
        :
        null
        }
      </div>
    </>
  );
}


const ContasVariaveis = (props) =>{
  const storage = useSelector(state => state)
  const data_table_variavel = []
  const dataSource = []
  const columns = [
    { title: 'Conta', dataIndex: 'conta', key: 'conta' },
    
    {
      title: 'Vencimento',
      dataIndex: 'vencimento',
      key: 'vencimento',
    },
  ];
   storage.person.moradores.map((info)=>
  dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,
  id: info[0].larUser.find(u => u.organization.id === storage.person.lar.id ).id},)
  )
  storage.person.contasVariaveis.map(c =>{
    data_table_variavel.push({
      key:c.id,
      conta: c.nome,
      vencimento:c.vencimento,
      description:<ContaIntTable moradores={dataSource} informacoes={c.informacoescontafixaSet}/>

    },)
  })
  return(
    <div>
      <h1>Contas Variaveis</h1>
    <Table
                columns={columns}
                expandable={{
                  expandedRowRender: record => <div style={{ margin: 0 }}>{record.description}</div>,
                  rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={data_table_variavel}
                pagination={false}
                scroll = {{ y: 240 }}
                />
      </div>
  )
}

export const Tarefas = (props) =>{
  const [deleteTask, { loading: mutationLoading, error: mutationError,data }] = useMutation(Delete_Tarefas);
  const storage = useSelector(state => state)
  const data_table = []
  const {refetch} = props
  
  storage.person.tarefas.map(task =>{
   
    data_table.push({
      key:task.id,
      tarefa: task.tarefa,
      description:"Responsaveis: "+ task.responsavel.map(p => p.user.firstName+" "+p.user.lastName)
    },)
  })
    const columns = [
        { title: 'Tarefa', dataIndex: 'tarefa', key: 'tarefa' },
        
        {
          title: 'Excluir Tarefa',
          dataIndex: '',
          key: 'x',
          render: (text, record) =><Popconfirm title="Tem certeza que quer deletar?" onConfirm={() => {deleteTask({variables:{tarefa:record.key}}); refetch()}}>
                                        <a>Excluir</a>
                                      </Popconfirm>,
        },
      ];

    return(
        <div>
            <Tabela columns= {columns} data = {data_table}/>
            <AdicionarTarefas  refetch = {props.refetch}/>
        </div>
    )
} 

const Tabela = (props) =>{
    
    return(
        <div>
            <Table
                columns={props.columns}
                expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
                }}
                dataSource={props.data}
                pagination={false}
                scroll = {{ y: 240 }}
            />
        </div>
    )
}
const AdicionarTarefas = (props) => {
    const storage = useSelector(state => state)
    const [addTask, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Task);
    const dataSource = []
    const {refetch} = props
    storage.person.moradores.map((info)=>
    dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,
    id: info[0].larUser.find(u => u.organization.id === storage.person.lar.id ).id},)
    )

    const onFinish = values => {
      console.log(values)
      values.tasks.map(v => {
        var result = dataSource.find(obj => {
          return obj.value === v.responsible
        })
        
        addTask({ variables: { responsavel:result.id, tarefa:v.task} })
        
      })
      refetch()
    };
   
    const onSelect = (value,info) => {
      //console.log("a",storage.person.moradores)
       // console.log('onSelect', info.id);
    }
    if(mutationLoading){
      return(
        <div>
          criando
        </div>
      )
    }
    return (
      <Form name="dynamic_form_nest_item"  onFinish={onFinish} autoComplete="off">
        <Form.List name="tasks">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'task']}
                      fieldKey={[field.fieldKey, 'task']}
                      rules={[{ required: true, message: 'Faltando Tarefa' }]}
                    >
                      <Input style={isMobile? { width: "35vw"}: {width:300}} placeholder="Tarefa" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'responsible']}
                      fieldKey={[field.fieldKey, 'responsible']}
                      rules={[{ required: true, message: 'Faltando Adicionar Responsavel' }]}
                    >
                      <AutoComplete
                            options={dataSource}
                            style={isMobile? { width: "35vw"}: {width:300}}
                            onSelect={onSelect}
                            filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                            }
                            placeholder="Responsavel(Ex:Lucas)"
                            
                        />
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
                    <PlusOutlined /> Adicionar Tarefa
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
  
        <Form.Item style= {{textAlign:"center"}}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    );
  };

export const Bens = (props) =>{
  const storage = useSelector(state => state)
  
  const data_table = []
 
  storage.person.moradores.map(morador =>{
    morador[0].itensSet.map(item=>{
      data_table.push({
        key:item.id,
        bem: item.objeto,
        dono:morador[0].login.firstName+" "+morador[0].login.lastName,
        
      },)
    })
  })
  
  const columns = [
    { title: 'Bem Pessoal', dataIndex: 'bem', key: 'bem' },
    
    {
      title: 'Proprietário',
      dataIndex: 'dono',
      key: 'dono',
    },
  ];
  return(
    <div>

      <Tabela columns= {columns} data = {data_table}/>
      <AdicionarBens refetch = {props.refetch}/>
    </div>
  )
}

const AdicionarBens = (props) => {
  const [addBem, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Bem);
  const storage = useSelector(state => state)
  const action = useDispatch()
  const {refetch} = props
  const dataSource = []
  storage.person.moradores.map((info)=>
    
    dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,id: info[0].id},)
    )
  const onFinish = values => {
   
    values.bem.map(v => {
      var result = dataSource.find(obj => {
        return obj.value === v.responsible
      })
      addBem({ variables: { pessoa:result.id, objeto:v.bem} })
      
    })
    refetch()
  };
 
  const onSelect = (value,info) => {
      console.log('onSelect', info.id);
  }
  
  if(mutationLoading){
   
    return(<div>salvando</div>)
  }
  /* if(data){
    
    (props.refetch)();
  } */
  return(
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
    <Form.List name="bem">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item
                  {...field}
                  name={[field.name, 'bem']}
                  fieldKey={[field.fieldKey, 'bem']}
                  rules={[{ required: true, message: 'Faltando Adicionar Bem' }]}
                >
                  <Input style={isMobile? { width: "35vw"}: {width:300}} placeholder="Bem" />
                </Form.Item>
                
                <Form.Item
                  {...field}
                  name={[field.name, 'responsible']}
                  fieldKey={[field.fieldKey, 'responsible']}
                  rules={[{ required: true, message: 'Faltando Adicionar Responsavel' }]}
                >
                  <AutoComplete
                        options={dataSource}
                        style={isMobile? { width: "35vw"}: {width:300}}
                        onSelect={onSelect}
                        filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        placeholder="Proprietario(Ex:Lucas)"
                        
                    />
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
                <PlusOutlined /> Adicionar Bem
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>

    <Form.Item style= {{textAlign:"center"}}>
      <Button type="primary" htmlType="submit">
        Salvar
      </Button>
    </Form.Item>
  </Form>
  )
}
export const DadosSaude = (props)=>{

  return(
    <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: "100vh" }}>
    
      <TabPane tab={`Resumo`} key={1} >
        <Resumo/>
      </TabPane>
      <TabPane tab={"Atualizar Saúde"} key={2} >
        <UpdateSaude refetch={props.refetch}/>
      </TabPane>
      <TabPane tab={"Contatos Emergência"} key={3} >
        <ContatosEmergencia/>
        <AddContatosEmergencia refetch={props.refetch}/>
      </TabPane>
  </Tabs>
  )
}
const Resumo = (props) =>{
  const storage = useSelector(state => state)

  return(
    <div>
    <Card title={storage.person.personal.nome + " " + storage.person.personal.sobrenome} bordered={false} style={{ width: 300 }}>
      <p>Idade: {storage.person.personal.idade}</p>
      <p>Plano de Saude: {storage.person.personal.saude.plano}</p>
      <p>Alergias: {storage.person.personal.saude.alergias}</p>
    </Card>
      

    </div>
  )
}
export const UpdateSaude = (props) => {
  const [updateSaude, { loading: mutationLoading, error: mutationError,data }] = useMutation(Update_Saude);
  const {refetch} = props
  const storage = useSelector(state => state)
    const layout = {
      labelCol: { span: 8},
      wrapperCol: { span: 10 },
    };
    
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
  const onFinish = values => {
    updateSaude({variables:{alergias:values.user.alergias,plano:values.user.plano,temPlano: values.user.temPlano,restricoesAlimentares: values.user.restrictions === null ? "" : values.user.restrictions}})
    refetch()
  };
  const openNotification = () => {
    notification.open({
      message: 'Informações salvas com sucesso!',
      description:
        'Agora seus colegas de quarto já podem ver suas informações de saúde atualizadas!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  if(data){
    openNotification();
  }
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}  validateMessages={validateMessages}>
      <Form.Item initialValue = {storage.person.personal.saude.temPlano} name={['user', 'temPlano']} label="Tem Plano de Saude?" >
        <Switch 
        //defaultChecked = {storage.person.personal.saude.temPlano} onChange={onChange} 
          
        />
      </Form.Item>
      <Form.Item initialValue = {storage.person.personal.saude.plano} name={['user', 'plano']}  label="Plano de Saude" >
        <Input  
          //defaultValue = {storage.person.personal.saude.plano} 

        />
      </Form.Item>
      <Form.Item initialValue  = {storage.person.personal.saude.alergias} name={['user', 'alergias']} label="Alergias">
        <Input 
          //defaultValue = {storage.person.personal.saude.alergias} 

        />
      </Form.Item>
      <Form.Item initialValue =  {storage.person.personal.saude.restricoesAlimentares} name={['user', 'restrictions']} label="Restrições Alimentares">
        <Input 
          //defaultValue = {storage.person.personal.saude.restricoesAlimentares}

        />
      </Form.Item>
      <Form.Item style={{marginRight:"120px"}} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      {
        mutationLoading
        ?
        <Button type="danger" loading>Salvando</Button>
        :

        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      }
      
      </Form.Item>
    </Form>
  );
};
const ContatosEmergencia=(props)=>{
  const storage = useSelector(state => state)
  
  const data_table = []
 
  storage.person.personal.saude.contatoEmergencia.map(contato =>{
    data_table.push({
      key:contato.id,
      nome: contato.nome,
      numero:contato.numero,
      
    },)
    
  })
  
  const columns = [
    
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    { title: 'Numero', dataIndex: 'numero', key: 'numero' },

  ];
  return(
    <Tabela columns= {columns} data = {data_table}/>
  )
}
const AddContatosEmergencia = (props) => {
  const [addContato, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Contato);
  const storage = useSelector(state => state)
  const {refetch} = props
  //console.log(storage.person)
  const onFinish = values => {
   
    values.contato.map(v => {
      
      addContato({ variables: { nome:v.responsible, numero:v.numero} })
      
    })
    refetch()
  };
 
  const onSelect = (value,info) => {
      console.log('onSelect', info.id);
  }
  
  if(mutationLoading){
   
    return(<div>salvando</div>)
  }
  /* if(data){
    
    (props.refetch)();
  } */
  return(
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
    <Form.List name="contato">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
               
                <Form.Item
                  {...field}
                  name={[field.name, 'responsible']}
                  fieldKey={[field.fieldKey, 'responsible']}
                  rules={[{ required: true, message: 'Faltando Adicionar Nome' }]}
                >
                  <Input placeholder="Nome do Contato" />
                  
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'numero']}
                  fieldKey={[field.fieldKey, 'numero']}
                  rules={[{ required: true, message: 'Faltando Adicionar Numero' }]}
                >
                  <Input placeholder="Numero" />
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
                <PlusOutlined /> Adicionar Contato
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>

    <Form.Item style= {{textAlign:"center"}}>
      <Button type="primary" htmlType="submit">
        Salvar
      </Button>
    </Form.Item>
  </Form>
  )
}

export const Configuracoes = (props) =>{
  const storage = useSelector(state => state)
  const { loading, error, data} = useQuery(Is_Owner,{variables:{larId: storage.person.lar.id}});
  
  const [removeUser, { loading: mutationLoading, error: mutationError,data: mutationData }] = useMutation(Remove_User_Home);
  const [changeOwner, { loading: mutationLoading2, error: mutationError2,data: mutationData2 }] = useMutation(Change_Owner);

  const {refetch} = props
  function showDeleteConfirm() {
    confirm({
      title: 'Tem certeza que deseja sair deste lar?',
      icon: <ExclamationCircleOutlined />,
      content: 'Apenas um administrador poderá gerer um novo convite após esta ação.',
      okText: 'Sim',
      okType: 'danger',
      cancelText: 'Não',
      onOk() {
          removeUser({variables:{email:storage.person.personal.email, larId:storage.person.lar.id}})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function showChangeOwnerConfirm() {
    confirm({
      title: 'Transferir propriedade do lar para outro usuario',
      icon: <ExclamationCircleOutlined />,
      content: <div>

        Apenas um administrador poderá gerer um novo convite após esta ação.
        {storage.person.moradores.map((info)=>(
              
              <div key={info[0].login.id} style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                <h3 key={info[0].login.id}>{info[0].login.firstName} {info[0].login.lastName}</h3>
                <Button size="small" style={{maxWidth:"80px"}} type="primary" onClick={()=>{
                  changeOwner({variables:{larId:storage.person.lar.id, newId:  info[0].larUser.find(u => u.organization.id === storage.person.lar.id ).id}})
                }} shape="round">Escolher</Button>
                
                
              </div>
           
              
                //info.map(m=> <h1>{m.id}</h1>)
            )
                
            )}
      </div>
      ,
    
      okText: "Cancelar",
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
          //removeUser({variables:{email:storage.person.personal.email, larId:storage.person.lar.id}})
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  if(mutationLoading){
    return(
      <LoadingPageLite/>
    )
  }
  if(mutationData || mutationData2){
    window.location.reload(false);
  }
 
  return(
    <div>
        <Button type="danger" onClick = {showDeleteConfirm}>
          Sair deste lar permanentemente
      </Button>
      {
        data
        ?
        (data.isOwner
        ?
        <div>
           <br></br>
        <Button type="primary" onClick = {showChangeOwnerConfirm}>
          Transferir propriedade do lar para outro usuario
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