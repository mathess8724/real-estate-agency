import React from 'react';
import './AdditionalPannel.scss';
import { useState } from 'react';

function AdditionalPannel(props) {

    const [isSlidePannel, setIsSlidePannel] = useState(true)

    function handlePannel() {
        setIsSlidePannel(!isSlidePannel)
    }
    function handleSort(sortType, direction = true){
        props.updateSort({sort:sortType, direction})
    }

    return (
        <div className={isSlidePannel ? 'additionalPannelBody additionalPannelBodyOn' : 'additionalPannelBody'}>
            <i className={isSlidePannel ? 'fas fa-arrow-circle-left arrowIco arrowIcoOn' : 'fas fa-arrow-circle-left arrowIco'} onClick={() => handlePannel()}></i>

            <h2>Sort</h2>
            <hr/>
            <div className="additionalPanneleContainair">
                
                <div className="priceSortContainer" onClick={ () => handleSort(0)}>
                    price pricecontaner
                    <div className="priceSlider">
                        slider price
                    </div>
                </div>
                <div className="surfaceContainer" onClick={ () => handleSort(1)} >
                    surface container
                </div>
                <div className="roomsContainer" onClick={ () => handleSort(2)} >
                    rooms container
                </div>
                <div className="postalCondeContainer"onClick={ () => handleSort(3)} >
                    postal code
                </div>
                <div className="cityContainer" >
                    city container
                </div>
            </div>
        </div>
    )
}

export default AdditionalPannel;