// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore,doc, setDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFevgDwBMe7Rk5E1sYlcyckYSWAILhas",
  authDomain: "hassan-firstproject.firebaseapp.com",
  projectId: "hassan-firstproject",
  storageBucket: "hassan-firstproject.firebasestorage.app",
  messagingSenderId: "313804450289",
  appId: "1:313804450289:web:99806855462d9cb5553c50",
  measurementId: "G-4N4YTB1DX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app);

//signup  ===>>>>>>>>>

function signup(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      console.log('successfully');
      console.log(userCredential);


      const user = userCredential.user;

    })
    .catch((error) => {

      console.log('phaataaaa');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);

    });
}
// login   ===>>>>>>>>>

function login(email, password) {

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
        console.log('successfully');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

         console.log(errorCode);

      console.log(errorMessage);
    });

}

//DB ===>>>>>>>>>

const db = getFirestore(app);

//add user details  ===>>>>>>>>>

async function addUserDetails (userdetails){
console.log('hiiiii');

try{
  await setDoc(doc(db, "user", "123"), userdetails);
console.log('hogaya');
}catch(err){
  console.log(err);
  
}

}

export { signup, login,addUserDetails }