import { signup,addUserDetails,getCurrentUser} from "./firebase.js";

let button = document.querySelector('button')
button.addEventListener('click',()=>{
    
let email = document.querySelector('#email')
let password = document.querySelector('#password')
signup(email.value,password.value)


})
 
  