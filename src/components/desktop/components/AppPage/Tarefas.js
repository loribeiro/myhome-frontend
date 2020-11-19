import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { AutoComplete, Button, Form, Input, Modal, Popconfirm, Select, Space, Steps, Table, Tabs } from 'antd';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import { Create_Task, Delete_Tarefas } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

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