import React from 'react';
import * as firebase from 'firebase';
import config from './FirebaseCfg';
import { useState } from 'react';


function FirebaseUpld(file, ref) {
    //firebase.initializeApp(config);

    
    let downloadLink;

    console.log('upload : ' + file[0])
    // storageRef = firebase.storage().ref(`img/`);
    
    let storageRef = firebase.storage().ref(`img/contacts/${ref}`);
    console.log(storageRef);

    storageRef.put(file[0]).then(function(snapshot) {
        console.log('file uploaded')
         storageRef.getDownloadURL().then(function(downloadURL) {
            downloadLink = downloadURL
            console.log('File available at', downloadLink);
            let linkRef = firebase.database().ref(`/contents/contacts/${ref}`)
            
            let linkImg = firebase.database().ref(`/contents/contacts/${ref}`).set({imgSrc:downloadURL})
            

            //return downloadLink
          });

          
        
    });
    
    

}

export default FirebaseUpld;