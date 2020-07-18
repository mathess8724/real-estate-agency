import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import compagnyLogo from './compagny-logo.png'


function Navbar(props){
    

    useEffect(() => {
            console.log(props.isActive)
            // = props.isActive
            

        },[]);

        function handleActive(id){
            //console.log('id is', id, 'props is ',  props.isActive)
            //console.log(activeId)
            props.updateActive(id)
            //console.log('id is', id, 'props is ',  props.isActive)
        }
    return(
        <div className="navBarBody">
           <div className="logoContainer">
               <a href="/"> <img className='compagnyLogo' src={compagnyLogo} alt=""/></a>
           </div>
           <div className="navBarContainer">            
               <div className={props.isActive === 0 ? 'navbarLinkActive' : 'navbarLink'} onClick={ () => handleActive(0)}  >Properties for sale</div>
               <div className={props.isActive === 1 ? 'navbarLinkActive' : 'navbarLink'} onClick={ () => handleActive(1)} >Properties for rent</div>
               <div className={props.isActive === 2 ? 'navbarLinkActive' : 'navbarLink'}  onClick={ () => handleActive(2)} >About compagny</div>
               <div className="searchContainer">
                   <input type="text" className="searchInput" placeholder='Search...'/>
               </div>
           </div>
        </div>
    )
}

export default Navbar;