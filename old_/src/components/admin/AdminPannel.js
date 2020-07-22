import React from 'react';
import './AdminPannel.scss';
import wheel from '../img/wheel2.png';
import Wheel from '../admin/Wheel.js';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import FirebaseCfg from '../configs/FirebaseCfg.js'
import base from '../configs/Base.js';
import addImg from './add.png';
import closeImg from './close.png';
import logOutImg from './disconnect.png';
import videoIcone from '../img/video-icone.png'


function AdminPannel() {

   const [isInfos,setIsInfos] = useState({isOn:false, id:"baseProject", db:'contacts'});
   const [preview,setPreview] = useState([]);
   const [rdyToSend,setRdyToSend] = useState([]);
   const [listContents,setlistContents] = useState([]);
   const [settingPage,setSettingPage] = useState('contents');


   const [listArray, setlistArray] = useState([]);
   const [listArrayPreview,setlistArrayPreview] = useState();
   const [User,setUser] = useState();
   const [login, setLogin] = useState(true);
   const [connectInfos,setConnectInfos] = useState({email: 'email', password: 'password'});
   const [listContacts,setListContacts] = useState([])
   const [listImages,setListImages] = useState([]);
   const [previewContacts] = useState([]);
   const [contactPreview,setContactPreview] = useState([]);


   let file ;
   let progress = null;

   let tempArray ;
    
   useEffect(() => {
       //console.log(listContacts)
       setLogin(true)
        //console.log('one time!')
    const fetchData =  () => {
        
        const dbRef = firebase.database().ref(isInfos.db)        
        dbRef.on('value', snapshot => {
            setlistArray(snapshot.val())
            //console.log(snapshot.val())
        })
        const dbRef2 = firebase.database().ref('/contents')        
        dbRef2.on('value', snapshot => {
            setlistContents(snapshot.val())
            console.log(snapshot.val())
        })
        const dbRef3 = firebase.database().ref(isInfos.db)        
        dbRef3.on('value', snapshot => {           
            setListContacts(snapshot.val())
            
            //console.log(snapshot.val())
        })
        const listRef = firebase.database().ref('/contactsImg')
        listRef.on('value', snapshot => {
            let t = snapshot.val()

            setListImages(t)
            //console.log(snapshot.val())
        })
        const listRef2 = firebase.database().ref('/contactsImg')
        listRef2.on('value', snapshot => {
            setContactPreview(snapshot.val())
            let t = Array.from(snapshot.val())
            //console.log(snapshot.val())
            //console.log(t)
        })
       
        
      
        let user = firebase.auth().currentUser;
        

   if (user) {
     // User is signed in. 
     console.log('user signed in'+ firebase.auth().currentUser.data )
     setUser(User)
     setLogin(false)
    } else {
        // No user is signed in.
        setLogin(true)
        //console.log('login On' + firebase.auth().currentUser)
   }
   document.title= 'Admin'
   
    }

   
    
    
          
    fetchData();

    
}, [])


    function setProjectOn(id){
        //console.log(('clicked'))
        //setIsInfos({isOn:!isInfos.isOn, id:isInfos.id})
        //switch database
        setIsInfos({isOn:isInfos.isOn,id:isInfos.id,db:isInfos.path})
        //console.log(isInfos.db)
        let idFormated = `${id}`
        //console.log(('checking for ' + idFormated + 'and' + isInfos.id))
        if(isInfos.id != idFormated && isInfos.isOn == true){
            //console.log('keep ison on and change infos' ) 
            setIsInfos({isOn:true, id:`${id}`})
                    setPreview({imgSrc : listArray[id].imgSrc, title:listArray[id].title, description:listArray[id].description, framework:listArray[id].framework,
                    link:listArray[id].link, title:listArray[id].title, description:listArray[id].description, type:listArray[id].type,
                    isLink:listArray[id].isLink, id:id, videoLink:listArray[id].videoLink,blender:listArray[id].blender, web:listArray[id].web, unity:listArray[id].unity})
            //tempArray = preview[0];
            //console.log('temp:'  + tempArray)
            
            
        }else{
        
        setIsInfos({isOn:!isInfos.isOn, id:`${id}`})
        //console.log(listArray[id].imgSrc)
        setPreview({imgSrc : listArray[id].imgSrc, title:listArray[id].title, description:listArray[id].description, framework:listArray[id].framework,
                    link:listArray[id].link, title:listArray[id].title, description:listArray[id].description, type:listArray[id].type,
                    isLink:listArray[id].isLink, id:id, videoLink:listArray[id].videoLink,blender:listArray[id].blender, web:listArray[id].web, unity:listArray[id].unity})
        setRdyToSend({imgSrc : listArray[id].imgSrc, title:listArray[id].title, description:listArray[id].description, framework:listArray[id].framework,
                    link:listArray[id].link, title:listArray[id].title, description:listArray[id].description, type:listArray[id].type,
                    isLink:listArray[id].isLink, id:id, videoLink:listArray[id].videoLink})
        setlistArrayPreview(listArray[id])
        //console.log(listArray[2])
        setRdyToSend(preview);
        }
        //console.log(rdyToSend);
        //link:listArray[id].link, title:listArray[id].title, description:listArray[id].description, type:listArray[id].type
    }

    function handleConnect(){
        
        
                //console.log(snapshot.val())
            
        //console.log('try to connect with' + connectInfos.email + ' and pass ' + connectInfos.password)

        firebase.auth().signInWithEmailAndPassword(connectInfos.email, connectInfos.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            //console.log('error : ' + errorCode + ' msg : ' + errorMessage)
            // ...
          });

          let user = firebase.auth().currentUser;

   if (user) {
     // User is signed in. 
     //console.log('user signed in')
     //console.log('connected as : ' + user)
     setUser({User: true})
     setLogin(false)
    } else {
        // No user .
        //console.log('user deconnected')
   }

    }
    function handleLogOut(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            //console.log(('User disconnected'))
            setLogin(true)
          }).catch(function(error) {
            // An error happened.
          });
          
    }

    function handleChange( item, strg){
        let id =  isInfos.id ? isInfos.id.replace('project', '') : ''
        
        //console.log('change id ' + id)
        
        
        if(item === 'email'){
            setConnectInfos(prevState =>({ ...prevState, 'email' : strg}))
           
        }
        if(item === 'password'){
            setConnectInfos(prevState =>({ ...prevState, 'password' : strg}))
            
            
        }
        if(item === 'description'){
            setPreview(prevState =>({ ...prevState, 'description' : strg}))
            firebase.database().ref(`projects/${id}/description`).set(strg)
        }
        if(item === 'title'){
            setPreview(prevState =>({ ...prevState, 'title' : strg}))
            firebase.database().ref(`projects/${id}/title`).set(strg)
        } 
        if(item === 'type'){
            setPreview(prevState =>({ ...prevState, 'type' : strg}))
            firebase.database().ref(`projects/${id}/type`).set(strg)
        } 
        if(item === 'framework'){
            setPreview(prevState =>({ ...prevState, 'framework' : strg}))
            firebase.database().ref(`projects/${id}/framework`).set(strg)
        } 
        if(item === 'link'){
            setPreview(prevState =>({ ...prevState, 'link' : strg}))
            firebase.database().ref(`projects/${id}/link`).set(strg)
            let formatedImgLink = `https://aprc.it/api/640x480/${strg}`
            firebase.database().ref(`projects/${id}/imgSrc`).set(formatedImgLink)
            setPreview(prevState =>({ ...prevState, 'imgSrc' : formatedImgLink}))
        } 
        if(item === 'videoLink'){
            
           if( strg.indexOf("youtube") === 12){

               setPreview(prevState =>({ ...prevState, 'videoLink' : strg}))           
               firebase.database().ref(`projects/${id}/videoLink`).set(strg)
               firebase.database().ref(`projects/${id}/player`).set(false)
               setPreview(prevState =>({ ...prevState, 'player' : false}))           
               
           }else{

               setPreview(prevState =>({ ...prevState, 'player' : true}))
               firebase.database().ref(`projects/${id}/player`).set(true)           
               setPreview(prevState =>({ ...prevState, 'videoLink' : strg}))            
               firebase.database().ref(`projects/${id}/videoLink`).set(strg)
               

           }
            
            

        }
        if(item === 'about'){
            setlistContents(prevState =>({ ...prevState, 'about' : strg}))
            firebase.database().ref(`contents/about`).set(strg)
            
                

        }
        if(item === 'isLink'){
            setPreview(prevState =>({ ...prevState, 'isLink' : strg}))
            setPreview(prevState =>({ ...prevState, 'videoLink' : ''}))
            setPreview(prevState =>({ ...prevState, 'image' : false}))
            setPreview(prevState =>({ ...prevState, 'link' : 'site url'}))
            firebase.database().ref(`projects/${id}/isLink`).set(strg)
            firebase.database().ref(`projects/${id}/videoLink`).set(false)
            firebase.database().ref(`projects/${id}/image`).set(false)
            firebase.database().ref(`projects/${id}/link`).set('site url')
        }
        if(item === 'video'){
            
            setPreview(prevState =>({ ...prevState, 'videoLink' : strg}))
            setPreview(prevState =>({ ...prevState, 'isLink' : null}))
            setPreview(prevState =>({ ...prevState, 'link' : null}))
            setPreview(prevState =>({ ...prevState, 'imgSrc' : 'https://firebasestorage.googleapis.com/v0/b/portfolio-f698b.appspot.com/o/img%2Fvideo-icone.png?alt=media&token=49f00f13-2424-4a69-8b16-666709a6c501'}))
            firebase.database().ref(`projects/${id}/videoLink`).set(strg)
            firebase.database().ref(`projects/${id}/isLink`).set(false)
            firebase.database().ref(`projects/${id}/link`).set(null)
            firebase.database().ref(`projects/${id}/imgSrc`).set('https://firebasestorage.googleapis.com/v0/b/portfolio-f698b.appspot.com/o/img%2Fvideo-icone.png?alt=media&token=49f00f13-2424-4a69-8b16-666709a6c501')
            //console.log('change to video')
        }
        if(item === 'image'){
            setPreview(prevState =>({ ...prevState, 'image' : strg}))
            setPreview(prevState =>({ ...prevState, 'isLink' : false}))
            setPreview(prevState =>({ ...prevState, 'videoLink' : ''}))
            firebase.database().ref(`projects/${id}/image`).set(strg)
            firebase.database().ref(`projects/${id}/isLink`).set(false)
            firebase.database().ref(`projects/${id}/videoLink`).set('')
        }
        if(item === 'web'){
            setPreview(prevState =>({ ...prevState, 'web' : strg}))
            setPreview(prevState =>({ ...prevState, 'blender' : false}))
            setPreview(prevState =>({ ...prevState, 'unity' : false}))
            firebase.database().ref(`projects/${id}/web`).set(strg)
            firebase.database().ref(`projects/${id}/blender`).set(false)
            firebase.database().ref(`projects/${id}/unity`).set(false)

        } 
        if(item === 'unity'){
            setPreview(prevState =>({ ...prevState, 'unity' : strg}))
            setPreview(prevState =>({ ...prevState, 'blender' : false}))
            setPreview(prevState =>({ ...prevState, 'web' : false}))
            firebase.database().ref(`projects/${id}/unity`).set(strg)
            firebase.database().ref(`projects/${id}/blender`).set(false)
            firebase.database().ref(`projects/${id}/web`).set(false)

        } 
        if(item === 'blender'){
            setPreview(prevState =>({ ...prevState, 'blender' : strg}))
            setPreview(prevState =>({ ...prevState, 'web' : false}))
            setPreview(prevState =>({ ...prevState, 'unity' : false}))
            firebase.database().ref(`projects/${id}/blender`).set(strg)
            firebase.database().ref(`projects/${id}/web`).set(false)
            firebase.database().ref(`projects/${id}/unity`).set(false)

        }
        if(item === 'delete'){

            firebase.database().ref(`projects/${isInfos.id}`).remove()
            setIsInfos({isOn:false})
            let n = isInfos.lenght +1
            setPreview(prevState =>({ ...prevState, 'id' : n}))
            
        }
        if(item === 'contents'){

            setSettingPage('contents')
            setIsInfos({isOn:false})
            setIsInfos({isOn:isInfos.isOn, id:isInfos.id, db:'contacts'})
            const dbRef = firebase.database().ref('contacts')        
            dbRef.on('value', snapshot => {
                setlistArray(snapshot.val())
            })
        }
        if(item === 'projectsPage'){

            setSettingPage('projects')
            setIsInfos({isOn:false})
            setIsInfos({isOn:isInfos.isOn, id:isInfos.id, db:'projects'})
            const dbRef = firebase.database().ref('projects')        
            
            setlistArray([])
            dbRef.on('value', snapshot => {
                setlistArray(snapshot.val())
            })
        }
        
        if(item === 'newProject'){
            setIsInfos({isOn:false})
            let ID = listArray.length;
            //console.log(id + 1)
            let n = 
                  
                {"player":true,
                    "title":"New project"
                   }
                    
            firebase.database().ref(`projects/${ID}`).set(n)
            let formatedId = `project${ID}`
            
            
        }
        
        //console.log(preview.item)
    }
    
    async function handleContact(file){
        let id = Date.now()
        let ref = firebase.storage().ref('/img/contacts/' +id )
        //console.log(file.name)
       await  ref.put(file).then(function(snapshot) {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log('Upload is ' + progress + '% done');
    
            //console.log('file Uploaded');
            snapshot.ref.getDownloadURL().then(function(downloadURL) {
                //console.log('File available at', downloadURL);
                //let array = {"id":id, "imgSrc":'testnew'}
                    
               
                   // Create a reference to 'images/mountains.jpg'
                   
                   

                     firebase.database().ref("/contactsImg").set([...listImages, {id,imgSrc:downloadURL}])
                  
                
              });
            
          });
          
         
          

       
    }

    function handleAddTxt(strg){
        let id =  isInfos.id
        setListContacts(prevState =>({ ...prevState, 'link' : strg}))
        firebase.database().ref(`contacts/${id}/link`).set(strg)
        //console.log(strg)
        //console.log(id)
    }

    function handleaddContact(){
        let id = Date.now();
        //console.log(id)
        let ref = firebase.database().ref(`contacts/${id}`)
         let ID = listArray.length;
            ////console.log(id + 1)
            let n = 
                  
                {"link":'true',
                    "imgSrc":"New project"
                   }
                    
            firebase.database().ref(`contacts/${ID}`).set(n)
    
    }

    function handleadelContact(){
        firebase.database().ref(`contacts/${isInfos.id}`).remove()
        setIsInfos({isOn:false})

    }

    function handlecontactSetImg(src){
        let change = listContacts[0]
        //console.log( change)
        //console.log(src)
        firebase.database().ref(`contacts/${isInfos.id}`).set({'imgSrc': src, 'link': change.link})
    }
   
    

    return(
        <div className='adminBody'>
            <Wheel />
           
            {
                login
                ?
                <div className='loginContainer'>

                    <div className="login">

                    <div>
                        
                        <input onChange={ (e) => handleChange('email', e.target.value)} placeholder='email' className='loginInput' type="text"/>
                        </div> 
                    <div>
                        <input onChange={ (e) => handleChange('password', e.target.value)} placeholder='password' className='loginInput' type="password"/>
                        </div>
                        <div onClick={ () => handleConnect()} className="loginConnect">Connect</div> 
                </div>
                    </div>
                :
            
            <div className="adminContainer">
            <div className="adminContainer">

                
                   
                
                
                <div className="slider">
        
                <div className="menuBar">

                    <div className="logOutBtn" onClick={ () => handleLogOut()} >
                        <img src={logOutImg} alt="" className="logOutImg"/>
                    </div>
                <div className="button1">
            <Link className='neonLink' to='/'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Home
            </Link>
            </div> 
            <div className="button2">
            <Link className='neonLink' to='/'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                general
            </Link>
            </div> 
            <div className="button3">
            <Link className='neonLink' to='/admin' onClick={ () => handleChange('projectsPage','')}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                projects
            </Link>
            </div> 
            <div className="button4">
            <Link className='neonLink' to='/admin' onClick={() => handleChange('contents', '')}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
               contents
            </Link>
            </div> 
            
           </div>
                </div>

                  {
                  settingPage === 'projects'
                  ? 
        <div className="projectsPage">
                   <div className="listContainer">
                    
                       <div className="list">
                           {
                               listArray.map((project,index) => (
                                   
                                <div key={index} className={isInfos.isOn === true && isInfos.id === `${index}` ? 'project isOn' : 'project'} name={`project${index}`}
                                
                                //style={isInfos.isOn === true && isInfos.id == `project${index}` ? {height: '200px'} : {height: '10px'}}
                                                                
                                id={`project${index}`} onClick={ () => setProjectOn(index)}> 
                                                                  
                                <ul className="projectInfos">                               
                                    <li>{project.title}</li>
                                    <li>{project.framework}</li>
                                    <li className='screenShot'>
                                        <img  className='screenshotImg' src={project.imgSrc} alt=""/>
                                    </li>
                                </ul>
                                {
                                        
                                    }
                           </div>
                               ))
                           }                         
                       </div>
                   </div>
                   <div className="modifyContainer">
                       
                       <div className="preview">
                        
                      { isInfos.isOn   ?

                        



            
                isInfos.isLink 
                ?
                
<a target="_blank"  href={preview.link} >
       
    <div  className="box" >
        
    <div className="imgBx">
        <img src={preview.imgSrc} alt=""/>
    </div>
    <div className="content">
        <div>
          <h2 className='cardTitle' >{preview.title}</h2>
              <p>Type: </p>
              <p>Framework: {preview.framework}</p>
              <p>Lien: vers site (nouvelle fenetre)</p>
              <p>{preview.description}</p>                               
        </div>
    </div>
</div>
</a>                 

                :
<div >
    <div >

    <div className="box" >
    <div className="imgBx">
        <img src={preview.imgSrc} alt=""/>
    </div>
    <div className="content">
        <div>
          <h2 className='cardTitle'>{preview.title}</h2>
              <p>Type: {preview.type}</p>
              <p>Framework: {preview.framework}</p>
              <p>Lien: vidéo</p>
              <p>{preview.description}</p>                               
        </div>
    </div>
</div>
    </div>
</div>



            

: 

<div></div>

        }

                       </div>
                       <div className="contentContainer">
                           
                           {
                               isInfos.isOn
                               ?

                            <div className="modifyContent">
                                  <div className="delBtn" onClick={() => handleChange('delete', 'delete')}>  DELETE </div>
                              <div>
                                <form className='modifyForm' action="">
                                    <div>title :</div>
                                     <input className='modifyInput' type="text" value={preview.title} onChange={ (e) => handleChange('title', e.target.value )} />
                                </form>
                              </div>
                                
                              <div>type : <form className='modifyForm' action="">
                                    <input  className='modifyInput' type="text" value={preview.type} onChange={ (e) => handleChange('type', e.target.value )} />
                                </form></div>
                              <div>framework : <form action="">
                                    <input className='modifyInput' type="text" value={preview.framework} onChange={ (e) => handleChange('framework', e.target.value )} />
                                </form></div>
                              <div className='typeButtons'>
                                  <div className={preview.web === true ? 'webBtnOn webBtn' : 'webBtn' } onClick={ () => handleChange('web', true)} >web</div>
                                  <div className={preview.blender ? 'webBtnOn webBtn' : 'webBtn'}onClick={ () => handleChange('blender', true)} >Blender</div>
                                  <div className={preview.unity ? 'webBtnOn webBtn' : 'webBtn'} onClick={ () => handleChange('unity', true)}>Unity</div>
                                  <div className={preview.isLink ? 'webBtnOn webBtn' : 'webBtn'} onClick={ () => handleChange('isLink', true)} style={{marginLeft: '30px'}}>Link</div>                                
                                  <div className={!preview.isLink  ? 'webBtnOn webBtn' : 'webBtn'} onClick={ () => handleChange('video', 'uurlVideo')}>Video</div>
                                  
                                  
                                  </div>
                              {
                                  preview.isLink === true 
                                  ?
                              <div>link : <form action="">
                                    <input className='modifyInput' type="text" value={preview.link} onChange={ (e) => handleChange('link', e.target.value )}/>
                                </form></div>
                                  :
                              <div>Video link : <form action="">
                                    <input className='modifyInput' type="text" value={preview.videoLink} onChange={ (e) => handleChange('videoLink', e.target.value )} />
                                </form></div>

                              }
                              <div>description : 
                              <form action="">
                                    <textarea className='modifyArea'  type="text" value={preview.description} onChange={  (e) => handleChange('description' , e.target.value)} />
                                </form></div> 
                                <div className="newProjectBtn" onClick={ () => handleChange('newProject', '')}>New project</div>                          
                                </div>
                               :
                               <div className='addImgContainer' > 
                                    
                                        <img onClick={ () => handleChange('newProject', '')}  className='addImg' src={addImg} alt=""/>
                                    
                               </div>
                               
                            }
                       </div>
                   </div>
                   
                </div>
                :
                <div></div>

    }
                  
    {
        settingPage === 'contents'
        ?
        <div className='contentsPage'>
        <div className="aboutContentContainer">
        <h1>About</h1>
                    <textarea value={listContents.about} onChange={ (e) => handleChange('about', e.target.value)} style={{padding: '20px'}} className='mdfyAbout' name="" id="" cols="30" rows="10"></textarea >
                    </div>
                    <div className="contactsContentscontainer">

                        <div className="contactsListContainer">
                            {
                                listContacts
                                ?
                                listContacts.map((contact,index) => (
                                    <div key={index} className="contactsUl" className={isInfos.isOn === true && isInfos.id === `${index}` ? 'contactsUl contactsIsOn' : 'contactsUl'}>

                                    <ul  className="contactsLI" >
                                        <li  >
                             <div style={{width:'100%', height:'100%'}}  onClick={ () => setProjectOn(index)} className='contactsLi' onClick={ () => setProjectOn(index)}>

                             <img style={{height:'20px'}} src={contact.imgSrc} alt="ImgLink"/>
                             </div>
                            </li>
                            <li className="contactsLi"  onClick={ () => setProjectOn(index)}>
                                {contact.link}
                            </li>
                                    </ul>
                                    </div>
                            
                                ))
                                :
                                <div></div>
                            }
                        </div>

                                                {

                        isInfos.isOn === true 
                        ?
                        <div className="addContact">
                        

                                    <div>
                                    <img onClick={() => handleaddContact()} style={{height:'50px', cursor:'pointer'}} src={addImg} alt="addIcon"/>
                                   
                                    <img onClick={() => handleadelContact()} style={{height:'50px', cursor:'pointer'}} src={closeImg} alt="addIcon"/>
                                    </div>
                                <div className="mdfyContactModule">
                                    <div>
                                        <input value={listContacts[isInfos.id].link} onChange={ (e) => handleAddTxt(e.target.value)} className='contactsInputs' type="text"/>
                                    </div>
                                    
                                    
                                    <div className="listImgContainer">
                                            {
                                        listImages
                                        ?

                                            listImages.map((img,index) => (
                                                <div key={index} className="avaiableImages" onClick={ () => handlecontactSetImg(img.imgSrc)} >
                                                    <img className='imgContact' src={img.imgSrc} alt="IMG"/>                                                    
                                                </div>
                                            ))
                                            
                                            
                                            :
                                            <div></div>
                                    }

                                            </div>
                                    <div>
                                        <input onChange={ (e) => file = e.target.files[0]} className='' type="file"/>
                                        <button onClick={  () =>handleContact(file)} className="sendContact">
                                                        {
                                                            !progress 
                                                            ? 
                                                            'Upload'
                                                            :
                                                            `${progress}`
                                                        }
                                                    </button>
                                    </div>
                                       
                                    
                                    
                                </div>
                                    
                        </div>
                        :
                        <div></div>
                                }
                   </div>

            </div>
            :
            <div></div>
    }
        
    
    
    </div>
    </div>
}
    </div>
    );
}

export default AdminPannel;
