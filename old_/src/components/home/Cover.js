import React, { useState } from 'react';
import './Cover.scss';

import Menu from '../menu/Menu';
import { Route, Redirect, Link } from 'react-router-dom';

function Cover() {


    const [theScroll, changeScroll] = useState('-2px');

        var theDiv ='';
        let scrollSize = '-20px';
        //console.log(scrollSize);
        
        window.addEventListener('scroll', function(){
             
            scrollSize = window.pageYOffset+'px'
            
            if(scrollSize === '0' ){
                //window.scroll(0, 0);
                //changeScroll('-2px');
                //console.log('reset scrool');
            }else {
                changeScroll(scrollSize);

            }
                
          
            
            

           
        })
        let a;
        let b;
        let c;
        let d;
        const [unlocked,setUnlocked] = useState(false);
        if(unlocked === true){
            return <Redirect to='/admin'/>;
        }
        function tryCode(){
            if(a === true && b === true && c === true && d === true){
               // console.log('Unlocked! go to admin!')
                
                setUnlocked(true);
                
             return ;
            }
        }
        document.onkeydown = function handleKeyDown(e){
            var key = e.keyCode;
            var newDirection;
            //console.log(e.which)
            
            switch(key){
                case 104:
                    a = true;
                    //console.log('a unlocked!' + a)
                    tryCode()
                    break;
                    case 103:
                        b = true;
                        //console.log('b unlocked!')
                        tryCode()
                        break;
                        case 98:
                            c = true;
                            //console.log('c unlocked!')
                            tryCode()
                            break;
                            case 100:
                                d = true;
                                //console.log('d unlocked!')
                                tryCode()
                                break;
                                case 32:
                                                
                    return;
                default:
                    return;
            }
            
        };
        
        
       
			/* window.addEventListener('scroll', function(){
                
				console.log(window.pageYOffset+'px')
			}) */

			/* var side2 = document.getElementById('side2')
			window.addEventListener('scroll', function(){
				side2.style.left = +window.pageYOffset+'px';
			}) */

    return(
        <div className="globalCove">

        <div className="coverContainer">

        
        {/* <div className="side" id="side1" style={{left:`${theScroll}`}}></div>
		<div className="side" id="side2" style={{left:`-${theScroll}`}}></div>
        	{/* <Home /> */}
            
            <Menu />
           
		
        
        </div>
        </div>
    );
}

export default Cover;