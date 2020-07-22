import React, { useState } from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';
import MenuIco from './MenuIco.svg';

function Header(){

    //change if the responsive menu is from slide or top
    let isSlider = false;

    //add a tittle Name
    const projectName = 'Mon agence';
    const aboutPageLink = '/about';
    
    //add menu links to this object ({linkName: '', link: '' })
    const menuLinks = [
         {linkName:'Biens à vendre', link:'/sell'},
         {linkName:'Biens à louer', link:'/rent'}

    ];

    //state of responsive menu
    const [menu, ShowMenu] = useState(false);

    
    //turn the responsive menu on
    const menuIsShow = () => {
       ShowMenu(!menu);
    }
 

    return (
       <div className="globalContainer">
           {(menu && isSlider) &&            
            <div className="sliderContainer">
                <div className="sliderTop">
                    <div className="sliderName">
                        Menu
                    </div>
                    <div className="sliderClose" onClick={menuIsShow}>
                        X
                    </div>
                </div>
                    <div className="sliderMenu">
                        <ul className="sliderUl">
                        <li className="sliderNav">
                            <Link className="sliderLink" to='/' onClick={menuIsShow}>
                            Accueil
                            </Link>
                        </li>
                            {menuLinks.map((link, index) => (                   
                                <li key ={index} className="sliderNav">
                            <Link className="sliderLink" to={link.link} onClick={menuIsShow}>
                               {link.linkName}
                            </Link>
                       </li>                   
               ))}
                        <li className="sliderNav">
                            <Link className="sliderLink" to={aboutPageLink} onClick={menuIsShow}>
                            A propos
                            </Link>
                        </li>
                              </ul>                   
                </div>
            </div>
           }
           
           
        <div className='container'>
           
             
            <div className="menuIco">
                <img src={MenuIco} alt="menuImg" className="menuIcoImg" onClick={menuIsShow}/>
            </div>
            
            
            <div className='agencyName'>
               <Link className="link" to='/'>
                {projectName}
                </Link> 
            </div>           
            
            
            
            {(menu && !isSlider )  && (
                <div className="respTopContainer">
               
               <ul className="linkMenu">
                   <li className="linkNav">
                            <Link className="link" to='/' onClick={menuIsShow}>
                            Accueil
                            </Link>
                        </li>
                    {menuLinks.map((link, index) => (                   
                       <li key ={index} className="linkNav">
                           <Link className="link" to={link.link} onClick={menuIsShow}>
                               {link.linkName}
                           </Link>
                       </li>                   
               ))}
               {menu && 
                   <li className="linkNav">
                   <Link className="link" to={aboutPageLink} onClick={menuIsShow}>
                       A propos
                   </Link> 
               </li> 
                   }                
                    </ul>               
            </div>
            )}

            {(!menu )  && (
                <div className="fullScreenMenu">
                     <ul className="linkMenu">
                    {menuLinks.map((link, index) => (                   
                       <li key ={index} className="linkNav">
                           <Link className="link" to={link.link} >
                               {link.linkName}
                           </Link>
                       </li>                   
               ))}
                    </ul>              
               </div>
            )}
            <div className='about'>
               <Link className="link" to={aboutPageLink}>
                A propos
                </Link> 
            </div>
        </div>
    </div>
    )
}

export default Header

