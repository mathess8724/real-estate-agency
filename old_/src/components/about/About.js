import React from 'react';
import '../about/About.scss';
import {Link} from 'react-router-dom';
import Card from '../card/GlowingCard';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import FirebaseCfg from '../configs/FirebaseCfg.js'
import base from '../configs/Base.js';
import Slider from '../slider/Slider'


function About() {

    const[content,setContent] = useState();

    useEffect(() => {

        const fetchData = () => {
            const dbRef = firebase.database().ref('/contents')        
            dbRef.on('value', snapshot => {
                setContent(snapshot.val())
                //console.log(snapshot.val())
            })
           
        }
        fetchData();

    
    }, [])
    
        

    return(
        <div className='aboutBody'>
           <Slider />
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
            <Link className='neonLink' to='/portfolio'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                portfolio
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
           <div className="titleBar">
               
           </div>
           <div className="aboutContainer">*

            <Card />
          
{/* 
           <div className="box">
		<span className="glass"></span>
		<div className="content">
			<h2>About me</h2>
            <div className="textContent">

		
			<p >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore
             et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat.</p>
			<p >Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore
             et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat.</p>

            </div>
		</div>
	</div> */}
           </div>
        </div>
    );
}

export default About;