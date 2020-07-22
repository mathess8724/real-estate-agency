import React from 'react';
import './Menu.scss';
import {Link} from 'react-router-dom';

function Menu() {

  function restScroll() {
    window.scroll(0, 0);
    console.log('reset scroll');
  }

    
  return(
    <div>
        <div className="menuBody">
            <div className="button1">
            <Link className='neonLink' to='/portfolio'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Portfolio
            </Link>
            </div> 
            <div className="button2">
            <Link className='neonLink' to='/about'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                About me
            </Link>
            </div>        
            <div className="button3">
            <Link className='neonLink' to='/contact'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Contact
            </Link>
            </div> 
                          
        
        </div>         
    </div>
 );
    

}


export default Menu;