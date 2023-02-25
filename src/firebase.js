import firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjYomgwEFSDhYR1aJ47jPe3KBPlYV9JlE",
  authDomain: "lb151-5bce3.firebaseapp.com",
  projectId: "lb151-5bce3",
  storageBucket: "lb151-5bce3.appspot.com",
  messagingSenderId: "462811585040",
  appId: "1:462811585040:web:3be742e540927b0b154895",
  measurementId: "G-LX637BYBTM"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export {auth, db};