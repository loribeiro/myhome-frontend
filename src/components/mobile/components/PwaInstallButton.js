import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import  {DownloadOutlined}  from '@ant-design/icons';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button 
    title="Install app"
    onClick={onClick}
    style = {{marginTop:"20px",  color:"white"}}
    type="primary" shape="round"><DownloadOutlined />Instale o myHome!</Button>
  );
};

export default InstallPWA;

