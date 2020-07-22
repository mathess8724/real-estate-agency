import React, { useEffect, useRef, useState } from 'react'
import {Redirect} from 'react-router-dom'
import './Login.scss'
import Wheel from './wheel2.png'
import FirebaseCfg from '../config/FirebaseConfig'
import * as firebase from 'firebase'
import FirebaseConfig from '../config/FirebaseConfig'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router-dom'



function Login(props){


    const mailRef = useRef('mailRef')
    const passRef = useRef('passRef')
    

    useEffect(() => {
        //FirebaseConfig()
        checkRedirect()
        //firebase.initializeApp(FirebaseCfg)
        //let user = firebase.auth().currentUser;
        //console.log(firebase.auth().currentUser)
        
    },[checkRedirect])
   
    

    function checkRedirect(){
       
        console.log(props.User)
        props.User ? props.setLogin(!props.login) : console.log('object')
    }
   async function handleConnect(type,email,password){
        console.log(email,password)
        
      await  type === 'logout' ? firebase.auth().signOut()
                            : firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                                // Handle Errors here.
                                var errorCode = error.code;
                                var errorMessage = error.message;
                                // ...
                              });


                              checkRedirect()
    }

    
    return (
        <div className='adminBody'>
           
            <div className="adminBackground">
                <div className="wheelContainer">
                    <img className='wheel1' src={Wheel} alt="wheel"/>
                    <img className='wheel2' src={Wheel} alt="wheel"/>
                </div>               
            <div className="loginContainer">
            <i onClick={ () => props.setLogin(!props.login)} className="far fa-times-circle closeButton"></i>                    

                <h1>Login</h1>
                <input ref={mailRef} placeholder='Email' type="text" className="mailInput" id='mailInput'/>
                <input ref={passRef} placeholder='Email' type="password" className="passInput" id='passInput'/>
                <div onClick={ () => handleConnect('connect',mailRef.current.value, passRef.current.value)} className="connectButton">
                    Connect
                </div>
            </div>
            </div>
        </div>
    )
}

export default withRouter(Login);