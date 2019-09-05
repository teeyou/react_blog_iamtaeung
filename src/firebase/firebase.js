import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// const config = {
//     apiKey: "AIzaSyB5MpZXXoQouHoofV0XX6ex69e5LsOigC0",
//     authDomain: "iamtaeung.firebaseapp.com",
//     databaseURL: "https://iamtaeung.firebaseio.com",
//     projectId: "iamtaeung",
//     storageBucket: "iamtaeung.appspot.com",
//     messagingSenderId: "306473024501"
//   };
  
const config = {
    apiKey: "AIzaSyC0wHfq8UYu_YhsGd5L_xNhWa9urEU21to",
    authDomain: "iamtaeung.firebaseapp.com",
    databaseURL: "https://teeublog.firebaseio.com",
    projectId: "teeublog",
    storageBucket: "teeublog.appspot.com",
    messagingSenderId: "306473024501"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.firestore = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        // this.auth.signInWithEmailAndPassword
    }
    doSignInWithEmailAndPassword(email, password) {
        return this.auth.signInWithEmailAndPassword(email,password)
    }
}

//   const firestore = new firebase.firestore()

  export default new Firebase()