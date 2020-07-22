import React from 'react';
import './SellingPage.scss';



function SellingPage
() {


    function translatslider(){
        console.log('slide!')
     document.getElementById('slider').animate(
        { transform: 'translateX(-200px)'}
     )
    }
    return(
        <div id="slider" onclick={translatslider}></div>
    );
}

export default SellingPage
;