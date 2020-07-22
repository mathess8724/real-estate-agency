import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';


const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAY8-8IicfyNGRGFykhLJ1D7S8MOQLwAyU",
        authDomain: "portfolio-f698b.firebaseapp.com",
        databaseURL: "https://portfolio-f698b.firebaseio.com",
        projectId: "portfolio-f698b",
        storageBucket: "portfolio-f698b.appspot.com"      
    }
)


const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;