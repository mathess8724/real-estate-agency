import React, { useState, useRef } from 'react';
import './Home.scss';
import Navbar from '../navbars/Navbar';
import AdditionalPannel from '../navbars/AdditionalPannel'
import * as firebase from 'firebase'
import FirebaseConfig from '../config/FirebaseConfig.js'
import { useEffect } from 'react';
import './modals/Modal.scss'
import RangeSlider from '../sliders/RangeSlider';
import Login from '../admin/Login'
import Wheel from '../admin/wheel2.png'
import Hands from './hands.webp'


function Home(props) {


    //////////////////user////////////////////////////
    //const [user,setUser] = useState()
    const [login, setLogin] = useState(false)
    //////////////////////////////////////////////////

    /////////////////refs/////////////////////////////
    const homeBodyref = useRef('homeBodyRef')
    const [homeHeight, setHomeHeight] = useState(homeBodyref.height)

    /////////////////properties array////////////////
    const [propertiesList, setPropertiesList] = useState([])
    const [propertiestype, setPropertiestype] = useState('sale')
    const [sortInfos, setSortinfos] = useState({ sort: null, direction: true })
    const [maxPrice, setMaxPrice] = useState(1000000)
    /////////////////////////////////////////////////

    ///////////////Search/////////////////////////////
    const [searchResult, setSearchresult] = useState([])
    const [search, setSearch] = useState(false)
    /////////////////////////////////////////////////

    //////////////////add house//////////////////////
    let newHouse =
    {
        "addedDate": 0,
        "city": "paris",
        "desc": "descr",
        "id": 0,
        "imgGalerie": [{
            "id": 0,
            "imgSrc": "https://firebasestorage.googleapis.com/v0/b/monagence-daf4c.appspot.com/o/images%2Fproperties%2F1561079043921?alt=media&token=d808e48c-57e9-4e33-a84d-509c9e1f8fb2"
        },],
        "imgSrc": 0,
        "name": "new added house",
        "nbRoom": 1,
        "postalCode": 0,
        "price": 0,
        "surface": 75,
        "type": "sale"
    }

    /////////////////modal param/////////////////////
    const [isModal, setIsModal] = useState(false)
    const modalRef = useRef('modalRef')
    const [modalInfos, setModalInfos] = useState([])
    const [modalGaleryCurrent, setModalGaleryCurrent] = useState(0)
    const [modify, setModify] = useState(false)
    const [modifyId, setModifyId] = useState()
    const [preview, setPreview] = useState()
    const [areaMaxTxt, setAreaMaxTxt] = useState()
    const [loadingAdd, setLoadingAdd] = useState(null)
    let file;

    function Modal(modalInfos) {

        function changeImg(direction) {
            let id = modalGaleryCurrent
            let max = modalInfos.imgGalerie.length
            let current = modalInfos.imgGalerie.indexOf(id)
            console.log(current)
            //console.log(id,max)
            direction === 'right' ? id++ : id = id - 1
            if (id >= 0 && id <= max - 1) {
                //console.log('can change!')
                setModalGaleryCurrent(id)
            }
        }
        function handelCloseModal() {
            setIsModal(false)
            setModify(false)
        }
        async function handleAddImg(file) {
            if (file) {
                console.log(file)
                let id = Date.now()
                let ref = firebase.storage().ref('/img/contacts/' + id)
                console.log(file.name)
                await ref.put(file).then(function (snapshot) {                    
                    setLoadingAdd(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                    console.log('file Uploaded');
                    snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        console.log('File available at', downloadURL);
                        setLoadingAdd(null)
                        let id = propertiesList[modifyId].imgGalerie.length
                        let newImgGalery = {
                            "id": id,
                            "imgSrc": downloadURL
                        }
                        firebase.database().ref(`/Properties/${modifyId}/imgGalerie/${id}`).set(newImgGalery)
                    });

                });
            }
        }
        function handlePreviewDel(id) {
            let check = propertiesList[modifyId].imgGalerie.length          

            if (check === 1) {
                alert('Minimal one image is required!')
            } else {
                let target = `/Properties/${modifyId}/imgGalerie/`
                let ref = firebase.database().ref(target)
                if (window.confirm(`this image will be removed, are you sure?`)) {
                    let tempArray = propertiesList //= firebase.database().ref(`/Properties/${modifyId}/`)
                    tempArray = propertiesList[modifyId].imgGalerie.filter(filtered => filtered.id != id)
                    tempArray.map((item, index) => (
                        tempArray[index].id = index
                    ))
                    ref.remove()                    
                    let newRef = firebase.database().ref(`/Properties/${modifyId}/imgGalerie`)
                    ref.set(tempArray)
                }
            }
        }

        return (
            <div className="modalBody">
                <span className="back"></span>
                <div className="modalContainerNoScroll">
                    <div className="modalContainer">
                        <i onClick={() => handelCloseModal()} className="far fa-times-circle closeButton"></i>                     
                        {
                            props.User && modify ? <h1><input onChange={(e) => handleWrite('name', e.target.value)} defaultValue={modalInfos.name} type="text" /></h1>

                                :

                                <h1>{modalInfos.name}</h1>
                        }
                        <div className="imgContainer">

                            <i style={modalGaleryCurrent < 1 ? { visibility: 'hidden' } : { visibility: 'visible' }} onClick={() => changeImg('')} className='fas fa-chevron-left imgArrows'></i>
                            {
                                props.User && modify ?
                                    <div className="previewgaleryContainer">
                                        <div className="mdfyGalery">
                                            <input onChange={(e) => file = e.target.files[0]} className='inputImg' type="file" />

                                            <i onClick={() => handleAddImg(file)} className="fas fa-folder-plus " id='previewImgAdd'></i>
                                            {loadingAdd && <div>{loadingAdd} % done</div>
                                            }
                                        </div>
                                        <div className="previewgalery">
                                            {
                                                propertiesList[modifyId].imgGalerie.map((img, index) => (
                                                    <div key={index} className="previewBox">
                                                        <i onClick={() => handlePreviewDel(index)} className="far fa-trash-alt" id='previewImgDel'></i>
                                                        <img className='previewImg' src={img.imgSrc} alt="" />


                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    :
                                    <img className='img' src={modalInfos.imgGalerie[modalGaleryCurrent].imgSrc} alt="" />
                            }
                            <i style={modalGaleryCurrent === modalInfos.imgGalerie.length - 1 ? { visibility: 'hidden' } : { visibility: 'visible' }} onClick={() => changeImg('right')} className='fas fa-chevron-right imgArrows'></i>
                        </div>
                        <span className="hr"></span>
                        <div className="infos">
                            <div>
                                {props.User && modify ? <input onChange={(e) => handleWrite('price', e.target.value)} defaultValue={modalInfos.price} type="text" /> : modalInfos.price} €,
                           {props.User && modify ? <input style={{ width: '30px' }} onChange={(e) => handleWrite('nbRoom', e.target.value)} defaultValue={modalInfos.nbRoom} type="text" /> : modalInfos.nbRoom} {modalInfos.nbRoom > 1 ? ' rooms' : ' room'},
                           {props.User && modify ? <input style={{ width: '30px' }} onChange={(e) => handleWrite('surface', e.target.value)} defaultValue={modalInfos.surface} type="text" /> : modalInfos.surface} m2
                    </div>
                            <div>
                                {props.User && modify ? <input style={{ width: '100px' }} onChange={(e) => handleWrite('city', e.target.value)} defaultValue={modalInfos.city} type="text" /> : modalInfos.city},
                            {props.User && modify ? <input style={{ width: '60px' }} onChange={(e) => handleWrite('postalCode', e.target.value)} defaultValue={modalInfos.postalCode} type="text" /> : modalInfos.postalCode}
                            </div>
                        </div>
                        <span className="hr"></span>
                        <div className="modalDesc">
                            {props.User && modify ? <div><textarea className='mdfytxtArea' maxLength='300' rows="10" onChange={(e) => handleWrite('desc', e.target.value)} defaultValue={modalInfos.desc} type="textarea" />{areaMaxTxt} chars left</div> : <p>{modalInfos.desc}</p>}
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    function handleModal(id, propertie) {       
        id === 'imgBox' && setIsModal(!isModal)
        id === 'imgBox' && setModalInfos(propertie)
        id === 'imgBox' && setModalGaleryCurrent(propertie.imgSrc)
        id === 'propertieBox' && setIsModal(!isModal)
        id === 'propertieBox' && setModalInfos(propertie)
        id === 'propertieBox' && setModalGaleryCurrent(propertie.imgSrc)
        id === 'back' && setIsModal(!isModal)
        id === 'back' && setModify(false)

    }

    function handleModify(id) {
        console.log('change id : ' + id)
        setModifyId(id)
        setModify(true)
        setModalInfos(propertiesList[id])
        setIsModal(true)
    }
    function handleWrite(container, content) {
        function ReeditArray() {
            let array = propertiesList
            let newId
            let target
            let ref
            array.map((item, index) => (
                //console.log(item.id, 'change to ', + index),newId = index,
                target = `/Properties/${index}/id`, console.log(target, newId),
                ref = firebase.database().ref(target).set(newId)

            ))
        }
        container === 'desc' && charsCalc(content.length)        
        let target = `/Properties/${modifyId}/${container}`     
        let ref = firebase.database().ref(target)
        ref.set(content)    
    }
    function charsCalc(e) {
        setAreaMaxTxt(300 - e)
    }

    function handleAdd() {
        let addedDate = new Date(Date.now())
        let id = propertiesList.length
        console.log(id)
        console.log(addedDate)
        newHouse.addedDate = addedDate
        newHouse.id = id
        let ref = firebase.database().ref(`/Properties/${id}`)
        ref.set(newHouse)
        console.log(newHouse)
    }

    function handleDelete(id) {
        setModifyId(id)
        setIsModal(false)
        if (window.confirm(`The house : ${propertiesList[id].name} will be removed, are you sure?`)) {
            firebase.database().ref(`Properties/${id}`).remove()
        } else {
            setIsModal(false)
        }
        setIsModal(false)
    }
    /////////////////////////////////////////////////    
    useEffect(() => {

        FirebaseConfig()
        //firebase.initializeApp(FirebaseConfig())
        const fetchData = () => {
            const dbRef = firebase.database().ref('/Properties')
            dbRef.on('value', snapshot => {                
                checkSort(snapshot.val())               
                setPropertiesList(snapshot.val())
                setPreview(snapshot.val())               
                setHomeHeight(homeBodyref.heigth)               
            })
        }
        fetchData()
    }, []);
    /////////////////Links props////////////////////////////
    const [active, setActive] = useState(0)

    ////////////////////Sort function//////////////////////////
    function checkSort(array) {
        let sortType = sortInfos;
        let result;
        if (sortInfos) {
            //sort by price
            if (sortInfos.sort === 0) {
                sortInfos.direction ? result = array.sort((a, b) => a.price - b.price) : result = array.sort((a, b) => b.price - a.price)
                
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

            if (sortInfos.sort === null) {
                return array
            }
            return result
        } else {
            return array
        }
    }
    ///////////////////////////////////////////////////////////
    return (
        <div ref={homeBodyref} className="homeBody">
            {
                props.User &&
                <div id='adminBodyOn' className="adminBody">
                    <div id='adminBackgroundOn' className={'adminBackground '}>
                        <div id='wheelOn' className="wheelContainer">
                            <img className='wheel1' src={Wheel} alt="wheel" />
                            <img className='wheel2' src={Wheel} alt="wheel" />
                        </div>

                    </div>
                </div>
            }
            <div ref={modalRef} onClick={(e) => handleModal(e.target.className, [])}>
                {isModal && Modal(modalInfos)}
            </div>
            <Navbar updateActive={setActive}
                title='the title test'
                isActive={active}
                homeRef={homeBodyref}
                Types={propertiestype}
                updateTypes={setPropertiestype}
                searchArray={propertiesList}
                updateResults={setSearchresult}
                setSearch={setSearch}
                login={login}
                setLogin={setLogin}
                User={props.User} />
            {
                login ? <Login User={props.User}
                    login={login}
                    setLogin={setLogin} /> : <div></div>
            }
            <AdditionalPannel updateSort={setSortinfos}
                sortInfos={sortInfos}
                maxPrice={maxPrice}
                updateMaxPrice={setMaxPrice}
                propertiesList={propertiesList}
                propertiestype={propertiestype} />
            <div className="homeContainair">
                <div className="head">
                    <img className='headImg' src={Hands} alt="" />
                </div>
                <h1>.</h1>
                <hr className="horizontalLine" />
                <div className="propertiesContainer">
                    <h2>Properties</h2>
                    {
                        props.User && <i onClick={() => handleAdd()} className="fas fa-folder-plus addbutton"></i>
                    }
                    <div className="listContainer">
                        {
                            search && searchResult.length < 1 ? <div className='noSearchResult'>Sorry, no result</div> :
                                checkSort(search ? searchResult : propertiesList).filter(filteredProperties =>
                                    filteredProperties.type === propertiestype)
                                    .filter(filteredProperties =>
                                        filteredProperties.price < maxPrice)
                                    .map((propertie, index) => (
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                                            {
                                                props.User &&

                                                <div className="mdfyContainer">
                                                    <div onClick={() => handleModify(propertie.id)} className="edit">
                                                        <i className="far fa-edit editbutton"></i>
                                                    </div>
                                                    <div className="del">
                                                        <i onClick={() => handleDelete(propertie.id)} className="far fa-trash-alt delButton"></i>
                                                    </div>
                                                </div>
                                            }
                                            <div className="propertieBox" onClick={(e) => handleModal('imgBox', propertie)}>
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
