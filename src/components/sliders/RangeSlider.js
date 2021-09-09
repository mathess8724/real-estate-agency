import React, { useRef, useEffect, useState } from 'react'
import './RangeSlider.scss'



function RangerSlider(props){

const inputRef = useRef()

const [noResult, setNoresult] = useState({'noResult':false, 'price':1})

useEffect(() => {   

},[]);
function checkPrice(){
    let minPrice = props.propertiesList.filter(filteredProperties =>
        filteredProperties.type === props.propertiestype)        
        .sort((a,b) => a.price - b.price)        
        console.log(minPrice[0].price)
}

function handleChange(maxPrice){
    console.log('chang price', props.propertiestype)
    let minPrice = props.propertiesList.filter(filteredProperties =>
        filteredProperties.type === props.propertiestype)        
        .sort((a,b) => a.price - b.price)
        let stopPrice = maxPrice * 50000
    stopPrice > minPrice[0].price ? props.updateMaxPrice(maxPrice * 50000) : console.log('sorry no result')
    stopPrice < minPrice[0].price ? setNoresult({'noResult': true, 'price': minPrice[0].price}) : setNoresult([])
}

    return (
        <div className="sliderBody">
            <input onChange={ (e) => handleChange(e.target.value)} min='1' max='20'  ref={inputRef} className='slider' type="range" list="tickmarks" />
<datalist id="tickmarks">
  <option value="0" > </option>
  <option value="10" > </option>
  
</datalist>
{
    noResult.noResult ?
        <div className='noResult'>
            sorry, no result for less expensive than {noResult.price} €
        </div>
        :
        <div></div>
}
        </div>

    )
}

export default RangerSlider;
