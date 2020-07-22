import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import compagnyLogo from './compagny-logo.png'
import Search from '../Searchs/Search'
import {BrowserRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import * as firebase from 'firebase'
function Navbar(props) {

    const navbarRef = useRef('navbarRef')

    const [responsiveNav, setResponsiveNav] = useState(null)


    useEffect(() => {
        //console.log(props.isActive)
        //console.log(props.scrollActive)

    }, []);
    ////////////////Link activation/////////////////////
    function handleActive(id) {
        //console.log('id is', id, 'props is ',  props.isActive)
        //console.log(props.homeRef.current.clientHeight)
        props.updateActive(id)
        id === 0 ? props.updateTypes('sale') : props.updateTypes('rent')
        //console.log('id is', id, 'props is ',  props.isActive)
    }
    ///////////////////////////////////////////////////
    function handleResponsive() {

        setResponsiveNav(!responsiveNav)
    }
    ////////////////Searchn////////////////////////
    const searchRef = useRef('searchref')
    function handleSearch(value){
        let search = value.current.value.toLowerCase()
        let searchArray = props.searchArray
        let d = 'name' 
        let check 
        let foundCount = []
        let results =[] 

        if (search.length > 2 ){
            props.setSearch(true)

            searchArray.map((check,index) => (
                //console.log(check.city.indexOf(search))
                check.city.toString().toLowerCase().indexOf(search) > -1 && console.log('found, will add it!', check.name) + results.push(check) ,
                check.name.toString().toLowerCase().indexOf(search) > -1 && console.log('found, will add it!', check.name) + results.push(check) ,
                check.postalCode.toString().toLowerCase().indexOf(search) > -1 && console.log('found, will add it!', check.name) + results.push(check) ,
                check.desc.toString().toLowerCase().indexOf(search) > -1 && console.log('found, will add it!', check.name) + results.push(check)
            ))
           
        }else{
            props.setSearch(false)
        console.log('Please, enter minimal 3 characteres')
        }
        props.updateResults(results)
    }
        ///////////////////////////////////////////////


        function handleLog(){
            !props.User ? props.setLogin(true) : firebase.auth().signOut()
            responsiveNav  && setResponsiveNav(!responsiveNav)
        }



    return (
        <div ref={navbarRef} className={responsiveNav ? 'navBarBody responsive' : 'navBarBody'}>
            <div className="logoContainer">
                <a href="/"> <img className='compagnyLogo' src={compagnyLogo} alt="" /></a>
            </div>
            <div className="navBarContainer">
                <div className={props.isActive === 0 ? 'navbarLinkActive' : 'navbarLink'} onClick={() => handleActive(0)}  >Properties for sale</div>
                <div className={props.isActive === 1 ? 'navbarLinkActive' : 'navbarLink'} onClick={() => handleActive(1)} >Properties for rent</div>
                <div className={props.isActive === 2 ? 'navbarLinkActive' : 'navbarLink'} onClick={() => handleActive(2)} >About compagny</div>
                <div className="searchContainer">
                    <input onChange={ () => handleSearch(searchRef) } ref={searchRef} type="text" className="searchInput" placeholder='Search ...' />
                </div>
                <div id='signIn' className='signInbutton' onClick={ () => handleLog()} >{props.User ? 'logout' : 'sign in'}</div>
            </div>           
            <i onClick={() => handleResponsive()}  className={responsiveNav ? 'fas fa-arrow-circle-up responsiveClose responsiveArrowUp' : 'fas fa-arrow-circle-up responsiveClose responsiveArrowDown'}></i>
            <div></div>
            
        </div>
    )
}

export default Navbar;