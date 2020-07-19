import React, { useState, useRef } from 'react';
import './Home.scss';
import Navbar from '../navbars/Navbar';
import AdditionalPannel from '../navbars/AdditionalPannel'
import * as firebase from 'firebase'
import FirebaseConfig from '../config/FirebaseConfig.js'
import { useEffect } from 'react';
import './modals/Modal.scss'
import RangeSlider from '../sliders/RangeSlider';
//import RangeSlider from '../sliders/RangeSlider';

function Home() {
    /////////////////refs/////////////////////////////
    const homeBodyref = useRef('homeBodyRef')
    const [homeHeight, setHomeHeight] = useState(homeBodyref.height)

    /////////////////properties array////////////////
    const [propertiesList, setPropertiesList] = useState([])
    const [search, setSearch] = useState()
    const [propertiestype, setPropertiestype] = useState('sale')
    const [sortInfos, setSortinfos] = useState({ sort: 0, direction: true })
    const [maxPrice, setMaxPrice] = useState(1000000)
    /////////////////////////////////////////////////

    /////////////////modal param/////////////////////
    const [isModal, setIsModal] = useState(false)
    const modalRef = useRef('modalRef')
    const [modalInfos, setModalInfos] = useState([])
    const [modalGaleryCurrent, setModalGaleryCurrent] = useState(0)

    function Modal(modalInfos) {

        function changeImg(direction) {
            let id = modalGaleryCurrent
            let max = modalInfos.imgGalerie.length
            //console.log(id,max)
            direction === 'right' ? id++ : id = id - 1
            if (id >= 0 && id <= max - 1) {
                //console.log('can change!')
                setModalGaleryCurrent(id)
            } else {
                //console.log('cant change')
            }
            //console.log('new id is ' + id)

        }
        return (


            <div className="modalBody">
                <span className="back"></span>
                <div className="modalContainerNoScroll">
                    <div className="modalContainer">
                    <i onClick={ () => setIsModal(!isModal)} className="far fa-times-circle closeButton"></i>
                        <h1>{modalInfos.name}</h1>
                        <div className="imgContainer">
                            <i style={modalGaleryCurrent < 1 ? { visibility: 'hidden' } : { visibility: 'visible' }} onClick={() => changeImg('')} className='fas fa-chevron-left imgArrows'></i>
                            <img className='img' src={modalInfos.imgGalerie[modalGaleryCurrent].imgSrc} alt="" />
                            <i style={modalGaleryCurrent === modalInfos.imgGalerie.length - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }} onClick={() => changeImg('right')} className='fas fa-chevron-right imgArrows'></i>
                        </div>
                        <span className="hr"></span>
                        <div className="infos">
                            <div>
                                {modalInfos.price} €, {modalInfos.nbRoom} {modalInfos.nbRoom > 1 ? ' rooms' : ' room'}, {modalInfos.surface} m2
                    </div>
                            <div>
                                {modalInfos.city}, {modalInfos.postalCode}
                            </div>
                        </div>
                        <span className="hr"></span>
                        <div className="modalDesc">
                            <p>{modalInfos.desc}</p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    function handleModal(id, propertie) {
        //console.log(id)
        id === 'imgBox' && setIsModal(!isModal)
        id === 'imgBox' && setModalInfos(propertie)
        id === 'imgBox' && setModalGaleryCurrent(propertie.imgSrc)
        id === 'propertieBox' && setIsModal(!isModal)
        id === 'propertieBox' && setModalInfos(propertie)
        id === 'propertieBox' && setModalGaleryCurrent(propertie.imgSrc)
        id === 'back' && setIsModal(!isModal)

    }

    /////////////////////////////////////////////////    
    useEffect(() => {

        firebase.initializeApp(FirebaseConfig())
        const fetchData = () => {
            const dbRef = firebase.database().ref('/Properties')
            dbRef.on('value', snapshot => {
                //console.log('normal ',snapshot.val())
                checkSort(snapshot.val())
                //console.log('sorted ',snapshot.val())
                setPropertiesList(snapshot.val())
                //console.log(homeBodyref)
                setHomeHeight(homeBodyref.heigth)
                //console.log(homeBodyref)

            })
        }
        fetchData()

    }, []);
    /////////////////Links props////////////////////////////
    const [active, setActive] = useState(0)

    //////////////////////////////////////////////////////////

    ////////////////////Sort function//////////////////////////
    function checkSort(array) {
        let sortType = sortInfos;
        let result;

        if (sortInfos) {
            //sort by price
            if (sortInfos.sort === 0) {
                sortInfos.direction ? result = array.sort((a, b) => a.price - b.price) : result = array.sort((a, b) => b.price - a.price)
                //console.log(result)
            }
            //sort by surface
            if (sortInfos.sort === 1) {
                sortInfos.direction ? result = array.sort((a, b) => a.surface - b.surface) : result = array.sort((a, b) => b.surface - a.surface)
                //console.log(result)
            }

            //sort by rooms
            if (sortInfos.sort === 2) {
                sortInfos.direction ? result = array.sort((a, b) => a.nbRoom - b.nbRoom) : result = array.sort((a, b) => b.nbRoom - a.nbRoom)
                //console.log(result)
            }

            //sort by postalCode
            if (sortInfos.sort === 3) {
                sortInfos.direction ? result = array.sort((a, b) => a.postalCode - b.postalCode) : result = array.sort((a, b) => b.postalCode - a.postalCode)
                //console.log(result)
            }


            return result
        } else {
            return array
        }




    }
    ///////////////////////////////////////////////////////////
    return (
        <div ref={homeBodyref} className="homeBody">
            <div ref={modalRef} onClick={(e) => handleModal(e.target.className, [])}>
                {isModal && Modal(modalInfos)}
            </div>
            <Navbar updateActive={setActive}
                title='the title test'
                isActive={active}
                homeRef={homeBodyref}
                Types={propertiestype}
                updateTypes={setPropertiestype} />
            <AdditionalPannel updateSort={setSortinfos}
                sortInfos={sortInfos}
                maxPrice={maxPrice}
                updateMaxPrice={setMaxPrice}
                propertiesList={propertiesList}
                propertiestype={propertiestype} />
            <div className="homeContainair">
                <h1 onClick={() => checkSort(propertiesList)}>Title .</h1>
                <hr className="horizontalLine" />
                <div className="propertiesContainer">
                    <h2>Properties</h2>
                    <div className="listContainer">
                        {
                            checkSort(propertiesList).filter(filteredProperties =>
                                filteredProperties.type === propertiestype)
                                .filter(filteredProperties =>
                                    filteredProperties.price < maxPrice)
                                .map((propertie, index) => (
                                    <div key={index} className="propertieBox" onClick={(e) => handleModal('imgBox', propertiesList[index])}>
                                        <span className="ellipsis"></span>
                                        <h3>
                                            {propertie.name}
                                        </h3>
                                        <div className="imgContainer">
                                            <img style={{ width: '100%', heigth: '100%' }} src={propertie.imgGalerie[propertie.imgSrc].imgSrc} alt="propertie Image" className="imgBox" />
                                        </div>
                                        <div className="descContainer">
                                            <div className="propertieInfos">
                                                <div className='price'>
                                                    {propertie.price} €
                                        </div>
                                                <div className='nbRoom'>
                                                    {propertie.city}, {propertie.postalCode}
                                                </div>
                                            </div>
                                            <div className="propertieInfos">
                                                <div className='surface'>
                                                    {propertie.nbRoom} {propertie.nbRoom > 1 ? ' rooms' : ' room'}, {propertie.surface} m2
                                        </div>
                                            </div>
                                            <div className="descBox">
                                                <p className="descr">{propertie.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;