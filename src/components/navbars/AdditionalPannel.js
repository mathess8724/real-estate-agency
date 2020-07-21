import React from 'react';
import './AdditionalPannel.scss';
import { useState } from 'react';
import RangeSlider from '../sliders/RangeSlider'

function AdditionalPannel(props) {

    const [isSlidePannel, setIsSlidePannel] = useState(false)

    function handlePannel() {
        setIsSlidePannel(!isSlidePannel)
    }
    function handleSort(sortType, direction = true) {
        //console.log(props.sortInfos.sort)
        
           props.updateSort({ sort: sortType, direction })
        
    }

    return (
        <div className={isSlidePannel ? 'additionalPannelBody additionalPannelBodyOn' : 'additionalPannelBody'}>

            <i className={isSlidePannel ? 'fas fa-arrow-circle-left arrowIco arrowIcoOn' : 'fas fa-arrow-circle-left arrowIco'} onClick={() => handlePannel()}></i>
            <h2>Sort houses</h2>
            <hr />
            <div className="additionalPanneleContainair">

                <div className="priceSlider">
                    Max price : {props.maxPrice} €
                        <RangeSlider maxPrice={props.maxPrice}
                        updateMaxPrice={props.updateMaxPrice}
                        updateSort={props.updateSort}
                        propertiesList={props.propertiesList}
                        propertiestype={props.propertiestype} />
                    <div className="maxPriseContainer">
                    </div>
                </div>
                <div className="priceSortContainer buttonContainer">
                    {
                        props.sortInfos.sort === 0
                            ?
                            <i className={props.sortInfos.direction ? 'fas fa-arrow-circle-right upButton' : 'fas fa-arrow-circle-right downButton'}
                                onClick={() => handleSort(0, !props.sortInfos.direction)} ></i>
                            :
                            <div></div>
                    }
                    <div className={props.sortInfos.sort === 0 ? 'sortButton sortButtonOn' : 'sortButton'} onClick={() => handleSort(0)}>
                        Sort by price
                   </div>
                </div>
                <div className="priceSortContainer buttonContainer">
                    {
                        props.sortInfos.sort === 1
                            ?
                            <i className={props.sortInfos.direction ? 'fas fa-arrow-circle-right upButton' : 'fas fa-arrow-circle-right downButton'}
                                onClick={() => handleSort(1, !props.sortInfos.direction)} ></i>
                            :
                            <div></div>
                    }
                    <div className={props.sortInfos.sort === 1 ? 'sortButton sortButtonOn' : 'sortButton'} onClick={() => handleSort(1)}>
                        Sort by surface
                   </div>
                </div>
                <div className="priceSortContainer buttonContainer">
                    {
                        props.sortInfos.sort === 2
                            ?
                            <i className={props.sortInfos.direction ? 'fas fa-arrow-circle-right upButton' : 'fas fa-arrow-circle-right downButton'}
                                onClick={() => handleSort(2, !props.sortInfos.direction)} ></i>
                            :
                            <div></div>
                    }
                    <div className={props.sortInfos.sort === 2 ? 'sortButton sortButtonOn' : 'sortButton'} onClick={() => handleSort(2)}>
                        Sort number of rooms
                   </div>
                </div>




                <div className="postalCondeContainer" onClick={() => handleSort(3)} >
                    .
                </div>

            </div>
        </div>
    )
}

export default AdditionalPannel;