import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { AutoComplete, Button, Form, Input, Modal, Select, Space, Steps, Table, Tabs } from 'antd';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { Create_Bem } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

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

