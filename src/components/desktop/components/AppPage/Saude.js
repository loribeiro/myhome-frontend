import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Button,Table, Card, Form, Input, Modal, notification, Select, Space, Steps, Switch, Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Create_Contato, Update_Saude } from "../../../../Queries";
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
const DadosSaude = (props)=>{

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
  export default DadosSaude;
  
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
   const UpdateSaude = (props) => {
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

