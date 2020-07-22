import React from 'react';
import './PortfolioHome.scss';
// get our fontawesome imports
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import unityLogo from '../portfolio/unity.png';
import { Link } from 'react-router-dom';
import codeLogo from './code.png';
import blenderLogo from './blender.png';
import Slider from '../slider/Slider';


function PortfolioHomme() {

    

    return(
        <div className="portfolioPage">
          <div className="fixedtest">
          <Slider />
            
          </div>
          
          
          
          
          <div className="menuBar">
           <div className="button2">
            <Link className='neonLink' to='/'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Home
            </Link>
            </div> 
            <div className="button1">
            <Link className='neonLink' to='/about'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                About me
            </Link>
            </div>
            <div className="button3">
            <Link className='neonLink' to='/portfolio/web'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                web & app
            </Link>
            </div>
           </div>


        <div className="portfolioContainer">
          <div className="customCardContainer">
            <Link className='link' to='portfolio/web'>
              <div className="customCardBox">
            <i className="fas fa-code codeIco"></i>
            <div className="customCardContent">
              Here is some web, App and mobile app projects 
            </div>
            </div>
            </Link>
            <Link className='link' to='portfolio/unity'>
            <div className="customCardBox">
            <i class="fab fa-unity codeIco"></i>
            <div className="customCardContent">
              Here is projects using Unity 3D 
            </div>
            </div>
            </Link>
            <Link className='link' to='/portfolio/blender'>
            <div className="customCardBox">
            <i class="fas fa-cubes codeIco"></i>
            <div className="customCardContent">
              Here is some 3d projects using Blender 3D
            </div>              
            </div>
            </Link>
          </div>
        <div className='portfolioGlobal'>




        </div>
        </div>
        </div>
    );
}

export default PortfolioHomme;