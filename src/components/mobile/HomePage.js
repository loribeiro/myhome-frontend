import React,{Suspense,lazy,useState} from 'react';
import {FirstArea,SecondArea} from './components/HomePage' 
const MobileHomePage = (props) =>{
    var CarouselDesktop = require('react-responsive-carousel').Carousel;
    const [current_slide, setSlide] = useState(1)
    
    const onChange = (page) => {
        if(page === 1){
           
           setSlide(0)

        }
    }
    const onClickItem = () => {
        //console.log("a")
    }
    const onClickThumb = () => {
        //console.log("a")
    }
    return (
        <CarouselDesktop width = "99vw" verticalSwipe= {true} stopOnHover = {true} showThumbs ={false}  showArrows={true} onChange={(page)=>onChange(page)} onClickItem={onClickItem} >
            <FirstArea/>
            <SecondArea/>
        </CarouselDesktop>
       
    )
}
export default MobileHomePage;

/*  <div style = {{display:"grid", gridTemplateRows:"0.4fr 0.4fr 0.2fr"}}>
            
            <div style={{textAlign:"center", backgroundColor:'#b3dced'}}>
                <h2 style={{color:"white"}}>myHome</h2>
                <h2 style={{color:"white"}}>Cadastre-se já!</h2>
            </div>
        </div> */