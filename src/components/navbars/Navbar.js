import React from 'react';
import './Navbar.scss';

function Navbar(){
    return(
        <div className="navBarBody">
           <div className="logoContainer">
               Logo
           </div>
           <div className="navBarContainer">
               <div>link</div>
               <div>link</div>
               <div>link</div>
               <div className="searchContainer">
                   <input type="text" className="searchInput" placeholder='Search...'/>
               </div>
           </div>
        </div>
    )
}

export default Navbar;