import React from 'react';
import './AdditionalPannel.scss';
import Navbar from '../navbars/Navbar';
import { useState } from 'react';

function AdditionalPannel(){

    const [isSlidePannel, setIsSlidePannel] = useState(false)

    function handlePannel(){
        setIsSlidePannel(!isSlidePannel)
    }

    return(
        <div className={ isSlidePannel ? 'additionalPannelBody additionalPannelBodyOn' : 'additionalPannelBody'}> 
            <i className={ isSlidePannel ? 'fas fa-arrow-circle-left arrowIco arrowIcoOn' : 'fas fa-arrow-circle-left arrowIco'} onClick={ () => handlePannel()}></i>          
                <h1>Title</h1>                
            <div className="additionalPanneleContainair">
            </div>
        </div>
    )
}

export default AdditionalPannel;