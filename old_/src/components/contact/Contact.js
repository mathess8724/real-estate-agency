import React from 'react';
import {Link} from 'react-router-dom'
import './Contact.scss';
import Card from '../card/GlowingCard.js';
import { useState, useEffect } from 'react';
import Upld from '../configs/FirebaseUpld';
import firebase from 'firebase/app';
import 'firebase/database';
import config from '../configs/FirebaseCfg';
import FirebaseUpld from '../configs/FirebaseUpld';
import logOutBtn from '../../components/admin/power-off.svg';
import Slider from '../slider/Slider'

function Contact() {

    const [contactsArray,setContactsArray] = useState([{contcarray:''}]);
    const [contacts,setContacts] = useState([]);

    const[content,setContent] = useState();

    useEffect(() => {

        const fetchData = () => {
            const dbRef = firebase.database().ref('/contacts')        
            dbRef.on('value', snapshot => {
                setContacts(snapshot.val())
                console.log(snapshot.val())
            })
           
        }
        fetchData();

    
    }, [])
    

  /*   
   function  handleContacts(file, ref, link){

        //console.log(contactsArray)
        let newContact = {link:link, id:ref}
         FirebaseUpld(file,ref) 

        
        //firebase.database().ref('/contents/contacts').set(newContact)
        let storageRef = firebase.storage().ref(`img/contacts/${ref}`);
    console.log(contacts)
       

    } */

    

    let file ;

    return(
        <div className='contactBody'>
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

                <div className='test1'>
                    
                    <div className='test2'>
                        <span></span>
                        <div className="test3">                         
                        
                            
                        {
                       contacts.map((contact,index) => (
                           
                           <div key={index} className='contactsListContainer2'>

                               <ul className="contactsList">
                       <li className="contactLi">
                        <img className="contactLiImg" src={contact.imgSrc} alt="ImgLink"/>
                       </li>
                       <li className="contactLi">
                           {contact.link}
                       </li>
                               </ul>
                               </div>
                       ))
                   }
                        </div>
                    </div>
                </div>



{/* 
            <div className="contactContainer">
                   <span></span>
               <div className="contactModule">
                   
                  
        
                   {
                       contacts.map((contact,index) => (
                           
                           <div key={index} className='contactsListContainer2'>

                               <ul className="contactsList">
                       <li className="contactLi">
                        <img className="contactLiImg" src={contact.imgSrc} alt="ImgLink"/>
                       </li>
                       <li className="contactLi">
                           {contact.link}
                       </li>
                               </ul>
                               </div>
                       ))
                   }
                   
                   
                   
                   
               </div>
              
            </div>

*/}
        </div>
    );
}

export default Contact;