import React from 'react';
import './App.less';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useRoutes} from 'hookrouter';
import Routes from './Routes';

function App() {
  const routResult = useRoutes(Routes)
  return routResult
}



export default App;
