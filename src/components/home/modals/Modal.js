import React, { useState, useRef } from 'react';
import './Modal.scss'


function Modal(modalInfos){
        
    let id = 0
    
    

    function changeImg(direction){
        console.log('carroussel!')
        direction === 'right' ? id ++ : id = id -1 
        console.log('new id is ' + id)
        
    }
        //console.log(modalInfos.imgGalerie[modalInfos.imgSrc].imgSrc)
    return(

                 
        <div className="modalBody">  
        <span className="back"></span>          
            <div className="modalContainer">
                
            <h1>{modalInfos.name}</h1>
           
            <div className="modalImg">
                <i onClick={ () => changeImg('')} className='fas fa-chevron-left imgArrows'></i>
                <img  style={{height:'100%', width:'100%'}} src={modalInfos.imgGalerie[id].imgSrc} alt='propertie Image'/>
                <i onClick={ () => changeImg('right')} className='fas fa-chevron-right imgArrows'></i>
            </div>
            <div className="infos">
                <hr className="horizontalLine"/>
                
                <div>
                    {modalInfos.price} €
                </div>
                <div>
                    {modalInfos.city}, {modalInfos.postalCode}
                </div>
            </div>
            </div>
        </div>
    )
}

export default Modal;