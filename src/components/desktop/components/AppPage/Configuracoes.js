import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Select, Steps, Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingPageLite } from '../../../../GeneralComponents';
import { Change_Owner, Is_Owner, Remove_User_Home } from "../../../../Queries";
const { Option } = Select;
const { TabPane } = Tabs;
const { Step } = Steps;
const { confirm } = Modal;

const Configuracoes = (props) =>{
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

 export default Configuracoes;