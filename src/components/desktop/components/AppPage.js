import React,{Suspense,lazy, useState, useEffect} from 'react';
import {Table,Tabs ,Card, Col, Row ,Menu} from 'antd';
import {Switch,Popconfirm ,Form, Input, Button, Space ,AutoComplete} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {isMobile} from 'react-device-detect';
import { client2 } from "../../../settings";
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import {Create_Task,Delete_Tarefas,Create_Bem,Create_Contato,Update_Saude} from "../../../Queries"
import { updateSaude } from '../../../store/reducers/personal_data_reducers';
const { TabPane } = Tabs;


export const VisaoGeral = (props) =>{
    const Moradores = (props)=>{
        const storage = useSelector(state => state)

        return(
            <Card title="Moradores" bordered={true}>
                    {storage.person.moradores.map((info)=>(
                      <div key={info.login.id} style={{display:'grid', gridTemplateColumns:"1fr 1fr"}}>
                        <h3 key={info.login.id}>{info.login.firstName} {info.login.lastName}</h3>
                        <Button type="primary" shape="round">detalhes</Button> 
                      </div>
                        //info.map(m=> <h1>{m.id}</h1>)
                    )
                        
                    )}
            </Card>
        )
    }
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
            <div>
                <Moradores/>
                <Despesas/>
                <Tarefas/>
            </div>
        )
    }
    return(
        <div className="site-card-wrapper">
            <Row  gutter={{ xs: 1, sm: 16, md: 24}}>
                <Col span={8}>
                    <Moradores/>
                </Col>
                <Col span={8}>
                    <Despesas/>
                </Col>
                <Col span={8}>
                    <Tarefas/>
                </Col>
            </Row>
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
      description:"Responsaveis: "+ task.responsavel.map(p => p.login.firstName+" "+p.login.lastName)
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
            <AdicionarTarefas refetch = {props.refetch}/>
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
    
    dataSource.push({value: info.login.firstName +" "+info.login.lastName,id: info.id},)
    )

    const onFinish = values => {
      values.tasks.map(v => {
        var result = dataSource.find(obj => {
          return obj.value === v.responsible
        })
        addTask({ variables: { responsavel:result.id, tarefa:v.task} })
        
      })
      refetch()
    };
   
    const onSelect = (value,info) => {
        console.log('onSelect', info.id);
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
                      name={[field.name, 'task']}
                      fieldKey={[field.fieldKey, 'task']}
                      rules={[{ required: true, message: 'Faltando Tarefa' }]}
                    >
                      <Input placeholder="Tarefa" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'responsible']}
                      fieldKey={[field.fieldKey, 'responsible']}
                      rules={[{ required: true, message: 'Faltando Adicionar Responsavel' }]}
                    >
                      <AutoComplete
                            options={dataSource}
                            style={{ width: 200 }}
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
    morador.itensSet.map(item=>{
      data_table.push({
        key:item.id,
        bem: item.objeto,
        dono:morador.login.firstName+" "+morador.login.lastName,
        
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
    
    dataSource.push({value: info.login.firstName +" "+info.login.lastName,id: info.id},)
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
                  <Input placeholder="Bem" />
                </Form.Item>
                
                <Form.Item
                  {...field}
                  name={[field.name, 'responsible']}
                  fieldKey={[field.fieldKey, 'responsible']}
                  rules={[{ required: true, message: 'Faltando Adicionar Responsavel' }]}
                >
                  <AutoComplete
                        options={dataSource}
                        style={{ width: 200 }}
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
      <h2>Nome: {storage.person.personal.nome}</h2>
      <h2>Sobrenome: {storage.person.personal.sobrenome}</h2>
      <h2>Idade: {storage.person.personal.idade}</h2>
      <h2>Plano de Saude: {storage.person.personal.saude.plano}</h2>
      <h2>Alergias: {storage.person.personal.saude.alergias}</h2>

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
  function onChange(checked) {
    //console.log(`switch to ${checked}`);
  }
  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
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