import React,{Suspense,lazy, useState, useEffect} from 'react';
import {Table ,Card, Col, Row } from 'antd';
import { Form, Input, Button, Space ,AutoComplete} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {isMobile} from 'react-device-detect';
import { client2 } from "../../../settings";
import { useDispatch, useSelector } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import {Create_Task} from "../../../Queries"

export const VisaoGeral = (props) =>{
    const Moradores = (props)=>{
        const storage = useSelector(state => state)

        return(
            <Card title="Moradores" bordered={true}>
                    {storage.person.moradores.map((info)=>(
                        <h3 key={info.login.id}>{info.login.firstName} {info.login.lastName}</h3>
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
  const storage = useSelector(state => state)
  const data = []
  console.log(storage.person.tarefas)
  storage.person.tarefas.map(task =>{
    data.push({
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
          render: () => <a>Excluir</a>,
        },
      ];

    return(
        <div>
            <Tabela columns= {columns} data = {data}/>
            <AdicionarTarefas/>
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
const AdicionarTarefas = () => {
    const storage = useSelector(state => state)
    const [addTask, { loading: mutationLoading, error: mutationError,data }] = useMutation(Create_Task);
    const dataSource = []
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
  const data = []
  const columns = [
    { title: 'Ben Pessoal', dataIndex: 'ben', key: 'ben' },
    
    {
      title: 'Dono',
      dataIndex: 'dono',
      key: 'dono',
    },
  ];
  return(
    <div>

      <Tabela columns= {columns} data = {data}/>
      <AdicionarBens/>
    </div>
  )
}

const AdicionarBens = (props) => {
  const storage = useSelector(state => state)
  const dataSource = []
  storage.person.moradores.map((info)=>
    
    dataSource.push({value: info.login.firstName +" "+info.login.lastName,id: info.id},)
    )
  const onFinish = values => {
    values.tasks.map(v => {
      var result = dataSource.find(obj => {
        return obj.value === v.responsible
      })
      //addTask({ variables: { responsavel:result.id, tarefa:v.task} })
      
    })
  };
 
  const onSelect = (value,info) => {
      console.log('onSelect', info.id);
  }
  return(
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
    <Form.List name="ben">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                <Form.Item
                  {...field}
                  name={[field.name, 'ben']}
                  fieldKey={[field.fieldKey, 'ben']}
                  rules={[{ required: true, message: 'Faltando Adicionar Ben' }]}
                >
                  <Input placeholder="Ben" />
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
                        placeholder="Dono(Ex:Lucas)"
                        
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
                <PlusOutlined /> Adicionar Ben
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
  
export const DadosSaude = (props) => {
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
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Plano de Saude" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="Alergias">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name={['user', 'restrictions']} label="Restrições Alimentares">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};