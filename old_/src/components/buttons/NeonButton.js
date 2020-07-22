import React from 'react';
import './NeonButton.scss';
import {Link} from 'react-router-dom';

function NeonButton(text) {

    

    return(
       <div>
           <div className="webPageBody">
           <a href="">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               Neon Button
           </a>
           <a href="">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               Neon Button
           </a>
           <a href="">
               <span></span>
               <span></span>
               <span></span>
               <span></span>
               Neon Button
           </a>
               </div>         
       </div>
    );
       
 
}

export default NeonButton;