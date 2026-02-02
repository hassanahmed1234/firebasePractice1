// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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

async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await addUserDetails(user.uid, {
      email: email,
      uid : user.uid,
      created: new Date()
    });
    signOut(auth)

  } catch (error) {
      console.log('code phaataaaa');
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
  }
}
// login   ===>>>>>>>>>

 function login(email, password) {

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      
     getuserdetails(user.uid)
   console.log('firestore me saved');
      // ...
      window.location = './home.html'
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

async function addUserDetails(uid, userdetails) {

  console.log(userdetails);

  try {
    await setDoc(doc(db, "users", uid), userdetails);
    console.log('hogaya ');

    window.location = './login.html'
  } catch (error) {
    console.error('Firestore error ', error.message);
  }


}

async function getuserdetails(uid) {
  console.log('chalaa'+ uid);
  

  const docRef = await doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  console.log(docRef);
  console.log(docSnap);
  

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return  docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

}

async function alluserdetail() {

  const q = query(collection(db, "users"));
  let userArr = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userArr.push( doc.data())
    console.log(doc.id, " => ", doc.data());
  });
 return userArr
  
}



function getCurrentUser() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      
      // console.log(user);
      // console.log(window.location);
      // getuserdetails(uid)

      if (window.location.pathname !== '/home.html') {
        window.location = './home.html'

      }

    }else{

      //login nhi hai

      if (window.location.pathname == '/index.html' || window.location.pathname == '/login.html') {
       
      } else{
         window.location = './login.html'
      }
    }
  });
}
function logOutUser() {
  
  signOut(auth).then(() => {
    window.location = './login.html'
    
 
  }).catch((error) => {
   console.log(error);
   
  });

}


export { signup, login, addUserDetails, getuserdetails, alluserdetail, getCurrentUser,logOutUser }


