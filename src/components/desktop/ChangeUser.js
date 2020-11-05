
import React, { useState, useEffect } from 'react';
import { Avatar, Button } from 'antd';
import { propTypes } from 'qrcode.react';

const UserList = [];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];

export const ChangeUser = (props) => {
  const [gap, setGap] = useState(GapList[0]);
  
  /* const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  }; */
  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };

  return (
   
    <div style={{display:"grid", gridTemplateRows:"1fr 1fr 1fr"}}>
        <div>

        </div>
        <div style={{textAlign:"center"}}>
            
            <h1>Escolha um dos lares em que você esta cadastrado:</h1>
            {
                props.lares.map((info,index)=>(
                    <div style={{marginTop:"10px"}}>
                        <Avatar style={{ backgroundColor: index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0], verticalAlign: 'middle' }} shape="square" size="large" gap={gap}>
                            {info.organization.name}
                        </Avatar>
                        <Button
                            size="small"
                            style={{ margin: '0 16px', verticalAlign: 'middle' }}
                            onClick={()=>{(props.setIndex)(index)}}
                            type="primary"
                        >
                            Entrar no Lar
                        </Button>
                        
                    </div>
                    
                    ))
            }
        </div>
        <div>

        </div>
    </div>
    
      
      
   
  );
};
