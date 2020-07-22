import React from 'react';
import './UnityPage.scss';
import {Link} from 'react-router-dom';
import { useState } from 'react';

import * as firebase from 'firebase';
import FirebaseCfg from '../configs/FirebaseCfg.js'
import base from '../configs/Base.js';
import { useEffect } from 'react';
import dataDB from '../../App'
import App from '../../App';
import Slider from '../slider/Slider';


function UnityPage() {
   
    let test ;

    let firebaseDB = [

    ];
    const [DB,setDB] = useState([]);
    const [cardInfo,setCardinfo] = useState({on:false, id:null});
    useEffect(() => {

        const fetchData = () => {
            const dbRef = firebase.database().ref('/projects')

            dbRef.on('value', snapshot => {
                setDB(snapshot.val())
            })
        }
        //let tryit = [{name: "hi"}, {name: "oie"}]
              
        fetchData();
            
    }, [])
    
    const [isModal,setModal] = useState(false) ;

    const [modalInfos,setModalInfos] = useState([
                            {
                                name:'',
                                src:'',
                                srcYt:'',
                                player:true
                            }
    ]);        
 


                

   
    
    function changeModal(name,src,player, videoLink) {
        setModal(!isModal);
       /*  let newLink = modalInfos.videoLink.replace('watch?v=','embed/')
        console.log(newLink); */
        let newLink =  src.replace('watch?v=','embed/')
        setModalInfos({name:name,src:src,player:player,srcYt:newLink});
        //console.log(modalInfos.srcYt);
        
        //console.log(modalInfos.src, modalInfos.src,modalInfos.player);
    }
    function clickOutside(e) {
        //console.log(DB);
        const inside = ''
        
        //console.log(e.target.id)
        if(e.target.id != 'videoContainer' && isModal === true ) 
        {
          //! console.log(e.target)
          
           setModal(!isModal);
           document.removeEventListener("click", clickOutside, false)
        }
     }
        if(isModal === true) {
            
        }

        function handleCardInfos(id){
            cardInfo.on
            ?
            cardInfo.id === id
            ?
            setCardinfo({on:!cardInfo.on, id:null})
            :
            setCardinfo({on:cardInfo.on, id:id})
            :
            setCardinfo({on:!cardInfo.on, id:id})
        }
        
        
        document.addEventListener("click", clickOutside, false);



    return(
       <div className='webpageBody'>
        <div className="fixedtest">
          <Slider />
            
          </div>   
          
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
            <Link className='neonLink' to='/portfolio/unity'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Unity 3d
            </Link>
            </div>
           </div>
            <div className="titleBar">
               Unity 3d
                </div>
          <div className="webPageContainer">
          
         
                   
               {
                   isModal ? 
                   
                    
                   <div className="modal">

                     {
                         modalInfos.player 
                         ?
                      <div className= 'modal-content'>
                        <video className='player'
                           controls='controls'
                           muted
                           >
                                <source src={modalInfos.src} type="video/mp4" />
                           </video>
                      </div>
                         
                         :
                         <div className="modal-content">
                         <iframe width="900" height="500" className='ytPlayer' 
                          src={modalInfos.srcYt} 
                          frameBorder="1" allow="accelerometer; 
                          autoplay; encrypted-media; gyroscope; 
                          picture-in-picture" allowFullScreen={true} muted>
                          </iframe>                      
                         </div>
                     }
                                                
                           
                   </div>
                   :
                   
                   <div style={{display:'none'}}></div>
                   
                          
                                  }
                
              { DB.map((project, index) => (
                  
                  project.unity ?

                  project.isLink && !isModal ? 
                
                  <div key={index} >
                    <a target="_blank"  href={project.link} style={ isModal ? {filter: 'blur(5px)'} : {}}>
                      <div className="customCardBox">
            <div className="customCardHeader">
                
            <div >
                          <img className="imgBx" src={project.imgSrc} alt=""/>
                      </div>
            </div>
            
            <div className="customCardContent">
         
            </div>
            <div className="customCardContent">
                <h2 className='cardTitle'>{project.title}</h2>
                      
           
                {
                cardInfo.on === true && cardInfo.id === index 
                ?
            <div className="content">
                                    <div>
                                            <p>Type: {project.type}</p>
                                            <p>Framework: {project.framework}</p>
                                            <p>Link: website (new window)</p>
                                            <p>{project.description}</p>                               
                                    </div>
                                </div>
                :
                
                <div></div>
            }

                </div>
            </div>
            </a>
            <div className="moreButon" onClick={ () => handleCardInfos(index)}>
                      <i className="fas fa-plus-circle"></i>
                      </div>
           

                  
                                 
                  </div>
                  
                  : 
                  <div key={index} >
                      <div className="customCardBox">
            <div className="customCardHeader" onClick={() => changeModal(`${project.title}`,`${project.videoLink}`, project.player)} style={ isModal ? {filter: 'blur(5px)'} : {}}>
                
            <div >
                          <img className="imgBx" src={project.imgSrc} alt=""/>
                      </div>
            </div>
            
     
            <div className="customCardContent">
                <h2 className='cardTitle'>{project.title}</h2>
                      
            {
                cardInfo.on === true && cardInfo.id === index 
                ?
            <div className="content">
                                    <div>
                                            <p>Type: {project.type}</p>
                                            <p>Framework: {project.framework}</p>
                                            <p>Link: Video</p>
                                            <p>{project.description}</p>                               
                                    </div>
                                </div>
                :
                
                <div></div>
            }
            
                </div>
            </div>
            
            <div className="moreButon" onClick={ () => handleCardInfos(index)}>
                      <i className="fas fa-plus-circle"></i>
                      </div>
                          
                          
                   

                  </div>
                  :
                  <div key={index}></div>
              ))}
         
	</div>
       </div>
    );
       
 
}

export default UnityPage;