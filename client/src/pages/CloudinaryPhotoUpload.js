import { React, useState }  from 'react'
import Axios from 'axios'

export default function CloudinaryPhotoUpload() {
  const [imageSelected, setImageSelected] = useState([])

  const uploadImage = () => {

    const formData = new FormData() 
    formData.append("file", imageSelected)
    formData.append("upload_preset", "hmuuncfsbcproj3")

    Axios.post("https:/api.cloudinary.com/v1_1/dweqcfhdc/image/upload", formData)
      .then(res => {
        console.log(res.data.url)
      })
  }

  const handlePhotoChange = (e) => {
    setImageSelected(e.target.files[0])
  }

  return (
    <div>
      <input type='file' onChange={(handlePhotoChange)}></input>
      <button onClick={uploadImage}>Upload Image</button>
    </div>
  )
}


// import React, { useState } from 'react'

// export default function CloudinaryPhotoUpload() {
//   const [image, setImage] = useState("");
//   const [url, setUrl] = useState("");

//   const uploadImage = () => {
//     const data = new FormData()
//     data.append("file", image)
//     data.append("upload_preset", "tutorial")
//     data.append("cloud_name", "breellz")
//     fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload", {
//       method: "post",
//       body: data
//     })
//       .then(resp => resp.json())
//       .then(data => {
//         setUrl(data.url)
//       })
//       .catch(err => console.log(err))
//   }
//   return (
//     <div>
//       <div>
//         <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
//         <button onClick={uploadImage}>Upload</button>
//       </div>
//       <div>
//         <h1>Uploaded image will be displayed here</h1>
//         <img src={url} />
//       </div>
//     </div>
//   )
// }
