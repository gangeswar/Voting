import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyC11aDsqS65uQmzCi5-RNd_j9k_zDlyp1k",
    authDomain: "shopping-fec80.firebaseapp.com",
    databaseURL: "https://shopping-fec80.firebaseio.com",
    projectId: "shopping-fec80",
    storageBucket: "shopping-fec80.appspot.com",
    messagingSenderId: "868021950418"
};

const app = firebase.initializeApp(config)
const base =  Rebase.createClass(app.database())

export default { base }