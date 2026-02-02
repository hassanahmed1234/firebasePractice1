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
      <div class="card-body">
        <a data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Update User</a>
      </div>
    </div> `
    document.querySelector('.container').innerHTML = card
})