import React from 'react';
import './Slider.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Slider() {

    const [isSlider,setIsSlider] = useState(false);
    
    let sliderRef = React.createRef();
    let buton1 ;
    let buton2;
    let buton3;

    function translateSlider(e){
      
        console.log('set slider')
       setIsSlider(!isSlider)
        
    }

    return(
        
        <div   className={  isSlider === true ? ' sliderisOpen' : 'sliderBody '}>

            
<div className='menuBarSlider '>
           <div className="button2">
            <Link className='neonLink' to='/' onClick={ () => setIsSlider(!isSlider)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Home
            </Link>
            </div> 
            <div className="button1">
            <Link className='neonLink' to='/portfolio'onClick={ () => setIsSlider(!isSlider)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                portfolio
            </Link>
            </div>
            <div className="button3">
            <Link className='neonLink' to='/about' onClick={ () => setIsSlider(!isSlider)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                About me
            </Link>
            </div>
            <div className="button4">
            <Link className='neonLink' to='/contact'onClick={ () => setIsSlider(!isSlider)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
               Contact
            </Link>
            </div>
            
           </div>
                
                <div  onClick={ (e) => translateSlider(e)} className={  isSlider === true ? 'sliderButton sliderButtonOpen ' : 'sliderButton '}>
                <i className="fas fa-bars"></i>
                
                </div>
                
                <div className="blurEffect">

                </div>
    
               
        </div>
    );
}

export default Slider
;