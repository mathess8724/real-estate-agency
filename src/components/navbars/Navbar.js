import React, { useState, useEffect, useRef } from 'react';
import './Navbar.scss';
import compagnyLogo from './compagny-logo.png'


function Navbar(props) {

    const navbarRef = useRef('navbarRef')

    const [responsiveNav, setResponsiveNav] = useState(false)


    useEffect(() => {
        //console.log(props.isActive)
        //console.log(props.scrollActive)

    }, []);

    function handleActive(id) {
        //console.log('id is', id, 'props is ',  props.isActive)
        //console.log(props.homeRef.current.clientHeight)
        props.updateActive(id)
        id === 0 ? props.updateTypes('sale') : props.updateTypes('rent')
        //console.log('id is', id, 'props is ',  props.isActive)
    }

    function handleResponsive() {

        setResponsiveNav(!responsiveNav)
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
                    <input type="text" className="searchInput" placeholder='Search...' />
                </div>
            </div>
            <i onClick={() => handleResponsive()} className={responsiveNav ? 'fas fa-arrow-circle-up responsiveClose responsiveArrowUp' : 'fas fa-arrow-circle-up responsiveClose responsiveArrowDown'}></i>
        </div>
    )
}

export default Navbar;