const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

const firebaseConfig = {};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { firebase, db };