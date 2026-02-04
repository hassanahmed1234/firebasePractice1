import { uploadimg } from "./cloudnary.js";
import { getCurrentUser, logOutUser, alluserdetail, updatedetails, deleteUserfirestore, deleteUserfirebase } from "./firebase.js";

getCurrentUser()

document.querySelector('#logout').addEventListener('click', () => logOutUser())

let userData = await alluserdetail()

let card = ""

userData.forEach((user) => {

  card += `<div class="card" style="width: 18rem;">
      <div class="card-body">
         <img src="${user.profilepic}" class="card-img-top" alt="">
        <h5 class="card-title">${user.fullName}</h5>
        <p class="card-text">${user.description}.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${user.email}</li>
        <li class="list-group-item">${user.userName}</li>
      </ul>
      <div  class="card-body">
       <button id=${user.uid} data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-primary">Update User</button>
       <button id=${user.uid} class="btn btn-danger">Delete User</button>
      </div>
    </div> `
  document.querySelector('.container').innerHTML = card
})

let body = document.body

let selectedUserDetails;

let fullName = document.querySelector('#firstname')
let userName = document.querySelector('#lastname')
let description = document.querySelector('#description')
let profilepic = document.querySelector('#profilepic')


body.addEventListener('click', (e) => {
  if (e.target.innerHTML == 'Update User') {
    console.log(e.target.id);

    selectedUserDetails = userData.find((user) => user.uid === e.target.id)


    fullName.value = selectedUserDetails.fullName || 'no fullName provided'
    userName.value = selectedUserDetails.userName || 'no userName provided'
    description.value = selectedUserDetails.description || 'no description provided'

  }
})

document.querySelector('#savebtn').addEventListener('click',async (e) => {

 let loader = document.querySelector('#loader')

 loader.classList.remove('d-none')


//cloudnary code.....
   const formData = new FormData();

    formData.append('file', profilepic.files[0]);
    formData.append('upload_preset', 'hassanpactice');

  const secure_url = await uploadimg(formData)
  // //cloudnary code.....

  selectedUserDetails.fullName = fullName.value
  selectedUserDetails.userName = userName.value
  selectedUserDetails.description = description.value
  selectedUserDetails.profilepic = secure_url
 
await updatedetails(selectedUserDetails,selectedUserDetails.uid,'users')

  window.location.reload()

})

body.addEventListener('click',async(e)=>{
  if(e.target.innerHTML !== 'Delete User') return
  console.log(e.target.id);
  

 await deleteUserfirestore('users',e.target.id)
 deleteUserfirebase()

 setTimeout(()=>{
  window.location.reload()
 },3000)

})

