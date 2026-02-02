import { getCurrentUser, logOutUser,alluserdetail } from "./firebase.js";

getCurrentUser()

document.querySelector('#logout').addEventListener('click',()=> logOutUser() )

 let userData = await alluserdetail()

let card = ""

userData.forEach((user)=>{
  
    card += `<div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">User</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s
          content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${user.email}</li>
        <li class="list-group-item">${user.password}</li>
      </ul>
      <div  class="card-body">
       <button data-id="${user.uid}" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="btn btn-primary">Update User</button>
      </div>
    </div> `
    document.querySelector('.container').innerHTML = card
})

let body = document.body

body.addEventListener('click',(e)=>{

  console.log(e.target.id);
  let selectedUser = userData.find((user) => user.uid === e.target.id)


  console.log(selectedUser);

//  if (e.target.id == 'UpdateUser') {

  
//  }
})