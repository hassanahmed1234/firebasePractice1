import {login } from "./firebase.js";

let button = document.querySelector('button')
button.addEventListener('click',()=>{
    console.log('lalala');
    
    
let email = document.querySelector('#email')
let password = document.querySelector('#password')
login(email.value,password.value)

})
 