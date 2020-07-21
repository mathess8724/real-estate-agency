import React, { useEffect, useState } from 'react';
import Home from './components/home/Home.js';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/admin/Login.js';
import * as firebase from 'firebase'
import FirebaseCfg from './components/config/FirebaseConfig'


function App() {

  function hanldeSession(user){
    user ? console.log('connected', user.email) : console.log('not connected')
    user ? setAccount(user.email) : setAccount(false)
  }
  const [account,setAccount] = useState()
  useEffect(() => {
    //FirebaseCfg()
        
        firebase.auth().onAuthStateChanged(function(user) {
           !user ? hanldeSession() :  hanldeSession(user)
            
          });
  },[])
  return (

    <Router>

    <div className="App">
    <Switch>
        <Route exact path='/' children={ <Home User={account} />}></Route>        
        <Route exact path='/about' children={ <Home User={account} />}></Route>
        <Route exact path="/admin" children={ <Login User={account} />} />
        <Route component={Home}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
