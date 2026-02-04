// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.

let apikey = '212833315186146'
let apisecret = 'st491gcziaAj9QqMa7amr-EjMP0'
const url = 'https://api.cloudinary.com/v1_1/dqxdbaet1/image/upload';

export async function uploadimg(formData) {
  
const response =  await fetch(url, {
      method: 'POST',
      body: formData,
    })

    const responsejson = await response.json()

   const {secure_url} = responsejson

   return secure_url

    console.log(secure_url);
    

}
