import firebase from 'firebase';
import store from '../Store/store';
import firebaseAPI from './firebaseApi';

firebase.initializeApp(firebaseAPI);


export const loginWithFirebase = () => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            resolve(result)
        }).catch(function (error) {
            console.log(error);

        });
    })
}


export const SignUpWithFirebase = (email , password) => {
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) =>{
                resolve(result)
            }).catch(function (error) {
            console.log(error);

        });
    })
    }