import React, { useEffect, useState } from 'react';
import './App.scss';
/* import Header from './components/header/Header'; */
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PortfolioHome from './components/portfolio/PortfolioHome';
import Cover from './components/home/Cover';
import Menu from './components/menu/Menu';
import WebPage from './components/webPage/WebPage';
import UnityPage from './components/unityPage/UnityPage';
import BlenderPage from './components/blenderPage/BlenderPage';
//import About from './components/about/About';
import * as firebase from 'firebase';
import cfg from './components/configs/FirebaseCfg';
import About from './components/about/About';
import Contact from './components/contact/Contact.js'
import AdminPannel from './components/admin/AdminPannel';
let dataDB = [];

function App() {
  





  return (
    <Router>
    <div className="App">
     {/*  <Header /> */}

      <Switch>
        <Route exact path='/' component={Cover}></Route>        
        <Route exact path='/about' component={About}></Route>
        <Route exact path='/portfolio' component={PortfolioHome}></Route>
        <Route exact path='/portfolio/web' component={WebPage}></Route>
        <Route exact path='/portfolio/unity' component={UnityPage}></Route>
        <Route exact path='/portfolio/blender' component={BlenderPage}></Route>
        <Route exact path='/admin' component={AdminPannel}></Route>
        <Route exact path='/contact' component={Contact}></Route>
        <Route component={Cover}></Route>
      </Switch>
    </div>
    </Router>
  );
}
export {dataDB};
export default App;
