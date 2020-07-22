import React from 'react';
import './GlowingCard.scss';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import FirebaseCfg from '../configs/FirebaseCfg.js'
import base from '../configs/Base.js';


function GlowingCard() {

    const[content,setContent] = useState([]);

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
        
     <div className="glowingCardContainer">

        <div className="glowingCardBox">
            <div className="glowingContent">

                <h1 className='glonwingTitle'>About me</h1>
                <p>
                    {content.about}
                </p>
            </div>
        <div className="glowinGlass"></div>
        </div>
        
    </div>
    );
}

export default GlowingCard ;



   


