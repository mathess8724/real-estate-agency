import React from 'react';
import './Wheel.scss';
import wheel from '../img/wheel2.png';

function Wheel() {

   

   //console.log(document.getElementsByClassName("wheelContainer"));
   //document.getElementById('wheel1').animation-duration = '1sec';

    return(
        

        /* function rotate (){
            setInterval(function(){
                document.getElementById(i).style.WebkitTransitionDuration="1s";
                document.getElementById(i).style.webkitTransform = 'rotate(40deg)';
            },100)
        } */
            <div className="wheelContainer" id='wheel1'>
                <img className='wheel' src={wheel}  alt="wheel"/>
               <div className="wheelContainer" id='wheel1'>
                <img className='wheel' src={wheel}  alt="wheel"/>              
           
                         
           
            </div>
           
            </div>
                
        
                  
                   
    
    );
}

export default Wheel;