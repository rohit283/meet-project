import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB9d1Sl9Yw2M5yPWZE1Kko0JMfSVdhlflI",
    authDomain: "meet-platform.firebaseapp.com",
    databaseURL: "https://meet-platform.firebaseio.com",
    projectId: "meet-platform",
    storageBucket: "meet-platform.appspot.com",
    messagingSenderId: "642254524244",
    appId: "1:642254524244:web:f22ee659c7b2d7ba1982c1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db