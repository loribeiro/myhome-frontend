import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Form,Button, Modal, Select, Steps, Tabs,Input } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingPageLite } from '../../../../GeneralComponents';
import { Change_Owner, Is_Owner, Remove_User_Home, Change_Home_Name } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

const Configuracoes = (props) =>{
    const storage = useSelector(state => state)
    const { loading, error, data} = useQuery(Is_Owner,{variables:{larId: storage.person.lar.id}});
    
    const [removeUser, { loading: mutationLoading, error: mutationError,data: mutationData }] = useMutation(Remove_User_Home);
    const [changeOwner, { loading: mutationLoading2, error: mutationError2,data: mutationData2 }] = useMutation(Change_Owner);
    const [changeName, { loading: mutationLoading3, error: mutationError3,data: mutationData3 }] = useMutation(Change_Home_Name);
    const [nomeLar, setNomeLar] = useState("")
    const {refetch} = props
    function showDeleteConfirm() {
      confirm({
        title: 'Tem certeza que deseja sair deste lar?',
        icon: <ExclamationCircleOutlined />,
        content: 'Apenas um administrador poderá gerar um novo convite após esta ação.',
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
      
        //okText: "Cancelar",
        //okType: 'danger',
        //cancelText: 'Cancelar',
        onOk() {
            //removeUser({variables:{email:storage.person.personal.email, larId:storage.person.lar.id}})
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
    const onFinish = values => {
      console.log(values)
      
       changeName({variables:{larId:storage.person.lar.id, nome: values.name.name }})
        
        
      
     // refetch()
    };
    function showChangeLarConfirm() {
      confirm({
        title: 'Mudar nome do Lar',
        icon: <ExclamationCircleOutlined />,
        content: <div>
          <Form   onFinish={onFinish} autoComplete="off">
          
        
            <Form.Item
              
              
              name={["name", 'name']}
                      fieldKey={["1", 'name']}
            >
              
              <Input onChange={(e)=>setNomeLar(e.target.value)} placeholder="Nome do Lar" />
            </Form.Item>
           
            <Form.Item style= {{textAlign:"center"}}>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Form.Item>
           
        
          </Form>
        </div>
        ,
        footer: null,
        //okText: "Atualizar",
        //okType: 'danger',
        //cancelText: 'Cancelar',
        onOk() {
          console.log(nomeLar)

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
    if(mutationData || mutationData2 || mutationData3){
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
          <br></br>
          <Button style={{marginTop:"30px"}} type="primary" onClick = {showChangeLarConfirm}>
            Mudar nome do lar
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

 export default Configuracoes;