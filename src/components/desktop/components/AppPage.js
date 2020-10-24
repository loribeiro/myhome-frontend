import React,{Suspense,lazy, useState, useEffect} from 'react';
import {Table,Tabs ,Card, Col, Row ,Menu} from 'antd';
import {Drawer,Switch,Popconfirm ,Form,Divider ,Input, Button, Space ,AutoComplete,notification} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import {isMobile} from 'react-device-detect';
import { client2 } from "../../../settings";
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import {Make_Invitation,Create_Task,Delete_Tarefas,Create_Bem,Create_Contato,Update_Saude} from "../../../Queries"
import { updateSaude } from '../../../store/reducers/personal_data_reducers';
import Sider from 'antd/lib/layout/Sider';
const { TabPane } = Tabs;


export const VisaoGeral = (props) =>{
    
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
                <Moradores refetch = {props.refetch}/>
                <Despesas/>
                <Tarefas/>
            </div>
        )
    }
    return(
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
  storage.person.moradores.map((info)=>(
    console.log(info)
    ))
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
                    <Detalhes info = {informacoes}/>
                    
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
  
  dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,id: info[0].id},)
  )

  const onFinish = values => {
    values.tasks.map(v => {
      
      addTask({ variables: { email:v.email} })
      
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
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
const Detalhes = (props)=>{
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
      </div>
    )
  }
  return(<div></div>)
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
    
    dataSource.push({value: info[0].login.firstName +" "+info[0].login.lastName,id: info[0].larUser.id},)
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