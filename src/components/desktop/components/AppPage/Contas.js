import { useMutation } from '@apollo/client';
import { Button, Form, InputNumber, message, Modal, Result, Select, Space, Steps, Table, Tabs } from 'antd';
import React, { useState } from 'react';
import CurrencyInput from 'react-currency-input';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import {Create_Conta_Variavel, Create_Registro_Conta_Variavel ,Create_Conta_Fixa, Create_Registro_Conta_Fixa, Delete_Tarefas } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

const Contas = (props) =>{
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
  export default Contas;

  
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
                <Option value="IPTU">IPTU</Option>
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
    const [visible, setVisible] = useState(false)
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
        description:<div></div>
  
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
                   <Button type="primary" htmlType="submit" onClick={() => setVisible(true)}>
              Adicionar Conta Variavel
            </Button>
            <Modal
            title="Adicionar Conta"
            footer = {null}
            visible = {visible}
            closable
            destroyOnClose
          >
  <AddContaVariavel setVisible = {setVisible} refetch={props.refetch} moradores = {dataSource} larId = {storage.person.lar.id}/>
  </Modal>
        </div>
    )
  }

const AddContaVariavel = (props) => {
  const [createConta, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Conta_Variavel);
  const [conta, setConta ] = useState("")
  const [date, setDate ] = useState("5")
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
      if( date !=="" && conta !==""){
        createConta({variables:{nome: conta, vencimento:date, larId:props.larId}})
        
      }
    };
    if(mutationLoading){
      return(
        <h1>Carregando</h1>
      )
    }
    if(data){
      return(
        <Result
      status="success"
      title="Conta adicionada com sucesso"
      
      extra={[
        <Button type="primary" key="console" onClick={()=>(props.setVisible(false), refetch())}>
         Fechar
        </Button>,
        
      ]}
    />
      )
    }
  return(
    <div style={{textAlign:"center"}}>
        <div>
                  <Form  name="dynamic_form_nest_item" preserve={false} autoComplete="off">
                  <Space direction="vertical">
                  <Form.Item
                    
                    //rules={[{ required: false, message: 'Faltando Tarefa' }]}
                    label="Conta"
                    
                  >
                    <Select  defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                        
                        <Option value="Gas">Gás</Option>
                        <Option value="Luz">Luz</Option>
                        <Option value="Agua">Agua</Option>
          
                    </Select>
                    </Form.Item>
                    <Form.Item
                    
                    //rules={[{ required: false, message: 'Faltando Tarefa' }]}
                    label="Vencimento(dia)"
                    
                    >
          
                    <InputNumber min={1} max={30} defaultValue={5} onChange={onChange} />
                  </Form.Item>
                  <Button type="primary"  onClick={() => {
                    if( date !=="" && conta !==""){
                      createConta({variables:{nome: conta, vencimento:date, larId:props.larId}})
                      
                    }
                  }}>
                      Adicionar
                    </Button>
                  </Space>
                  </Form>
        </div>
        <Button type = "danger" onClick={()=>(props.setVisible(false))}> Cancelar</Button>
    </div>
  )
} 