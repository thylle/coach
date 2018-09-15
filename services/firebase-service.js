import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

var config = {
  apiKey: "AIzaSyB7LtaET1eElF0RkAtT87s8_qR3TIf0ZsE",
  authDomain: "coach-app-1337.firebaseapp.com",
  databaseURL: "https://coach-app-1337.firebaseio.com",
  projectId: "coach-app-1337",
  storageBucket: "coach-app-1337.appspot.com",
  messagingSenderId: "401526995313"
};

// !firebase.apps.length ? firebase.initializeApp(config) : ''
firebase.initializeApp(config);

export const Database = firebase.database()
export default firebase
