import firebase from 'firebase/app'
import 'firebase/firestore'

// web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAERKn3DI1AbTjaFDvbgrlteCbloEO31i0",
  authDomain: "e-voting-system-96927.firebaseapp.com",
  projectId: "e-voting-system-96927",
  storageBucket: "e-voting-system-96927.appspot.com",
  messagingSenderId: "943945090945",
  appId: "1:943945090945:web:a02e4c390d52f242364a80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default db;