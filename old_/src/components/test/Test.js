import React from 'react';
import './Test.scss';
import pikachu from './pikachu.jpg';
import pikachu_map from './pikachu_map.jpg';
import * as PIXI from 'pixi.js';
import { useEffect } from 'react';



function Test() {
        useEffect(() => {
        
            
        
        }, [])
        let app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight});
//document.body.appendChild(app.view);

let img = new PIXI.Sprite.from({pikachu});
img.width = window.innerWidth;
img.height = window.innerHeight;
app.stage.addChild(img);

let depthMap = new PIXI.Sprite.from({pikachu_map});
depthMap.width = window.innerWidth;
depthMap.height = window.innerHeight;
app.stage.addChild(depthMap);

let displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
app.stage.filters = [displacementFilter];

    



    return(
        <div className='testBody' id='testBody'>
            {
                app.view
            }
            <img src={pikachu} alt=""/>
            
        </div>
    );
}

export default Test
;