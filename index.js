const ingresarform = document.querySelector("#ingresar-form")
const signUpForm = document.querySelector("#signup-form");



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyC57shwJAne3rmu7dXIVAmgOYcILOE0YiQ",
        authDomain: "proyectoprueba-26299.firebaseapp.com",
        databaseURL: "https://proyectoprueba-26299-default-rtdb.firebaseio.com/",
        projectId: "proyectoprueba-26299",
        storageBucket: "proyectoprueba-26299.appspot.com",
        messagingSenderId: "950652001465",
        appId: "1:950652001465:web:34091cf482a0fe3607cf68"
};

// Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs   = getFirestore(app);
const myModalR = new bootstrap.Modal('#signupModal');
const myModalI = new bootstrap.Modal('#signinModal');

//login check

const loggedoutr = document.querySelector('.loggedr-out')
const loggedouti = document.querySelector('.loggedi-out')
const loggedin  = document.querySelector('.logged-in')

const loginCheck = user =>{
        if(user){
                loggedin.style.display = 'block';

                loggedoutr.style.display = 'none';
                loggedouti.style.display = 'none';
        }
        else{
                loggedin.style.display = 'none';

                loggedoutr.style.display = 'block';
                loggedouti.style.display = 'block';
        }
} 
//registrar 
ingresarform.addEventListener('submit', (e) => {
        e.preventDefault();


        const correo = document.querySelector("#ingresar-email").value;
        const contraseña = document.querySelector("#ingresar-password").value;


        createUserWithEmailAndPassword(auth, correo, contraseña)
                .then((userCredential) => {
                        //limpiar modal
                        ingresarform.reset();

                        //cerrar modal 
                        myModalR.hide();
                        console.log("funciona")
                })

});

//Ingresar 
const signinform = document.querySelector('#login-form');

signinform.addEventListener('submit', e => {
        e.preventDefault();


        const correo = document.querySelector("#login-email").value;
        const contraseña = document.querySelector("#login-password").value;



        signInWithEmailAndPassword(auth, correo, contraseña)
                .then((userCredential) => {
                        //limpiar modal
                        signinform.reset();

                        //cerrar modal 
                        myModalI.hide();
                        console.log("logeado")
                })

})

//Google login

const botongoogle = document.querySelector('#googlelogin');
botongoogle.addEventListener('click', e =>{
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(result =>{
                console.log("Google login correct");
                
                signinform.reset();

                //cerrar modal 
                myModalI.hide();
        })
        .catch(err =>{
                console.log(err);
        })


})

/* facebook login
const botonface = document.querySelector('#facelogin');
facegoogle.addEventListener('click', e =>{
        e.preventDefault();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider)
        .then(result =>{
                console.log("Google login correct");
                
                signinform.reset();

                //cerrar modal 
                myModalI.hide();
        })
        .catch(err =>{
                console.log(err);
        })


})*/



//cerrar sesion

const cerrar = document.querySelector('#cerrar');

cerrar.addEventListener('click', e => {
        e.preventDefault();
        auth.signOut().then(() => {

                console.log("cerrado")
        })

})

//Eventos
// Lista de cambios 

auth.onAuthStateChanged( user => {
        if(user)
        {
             loginCheck(user);
             console.log("Entro");
        }
        else
        {
                loginCheck(user);
               console.log("Cerro");
        }



})