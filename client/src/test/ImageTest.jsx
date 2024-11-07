import React, { useState } from 'react'
import axios from 'axios';
const ImageTest = () => {
    const [imageToUpload,setImage] = useState({image:"",file:""})
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB
    const[error,setError] = useState("")
    const handleEditSubmit = async () => {
            try {
                let image = '';
                // Check if a new image is selected and differs from the current image
                if (imageToUpload) {
                    const formData = new FormData();
                    formData.append('file', imageToUpload.file); // Correctly append the file
                    // Upload the image
                    const responseImage = await fetch(`${BACKWEB}/api/image/imageUpload`, {
                        method: 'POST',
                        body: formData,
                    });
    
                    if (responseImage.ok) {
                        const responseData = await responseImage.json();
                        image = responseData.url; // Get the image URL from the response
                        console.log(image);
                        alert("Image Uploaded");
                    } else {
                        throw new Error('Image upload failed');
                    }
                }
    
                // Update user profile
    
            } catch (err) {
                console.error(err);
                alert('There was an error updating your details');
            }
        
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Access the first file from the file input
      
        if (file) {
            const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      
            // Check if the file type is valid
            if (!validImageTypes.includes(file.type)) {
                setErrorI('Invalid file type. Please upload an image (jpg or png).');
                return;
            }
      
            // Check if the file size is within the limit (1MB)
            const maxSizeInBytes = 200 * 1024; // 1MB in bytes
            if (file.size > maxSizeInBytes) {
                setErrorI('File size exceeds 200KB. Please upload a smaller image.');
                return;
            }
      
            // Preview the image using FileReader
            const reader = new FileReader();
            reader.onload = () => {
                const previewUrl = reader.result;
                setImage({ file: file, image: previewUrl });
            };
            reader.readAsDataURL(file);
      
            // Clear any previous errors for this field
        }
      };
      
  return (
        <div>
            <img
        src={imageToUpload.image}
        className="rounded-circle w-48 h-48 mb-9 ml-20"
        alt="current image"
        />
      <input
        className="file-upload"
        type="file"
        name="image"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleImageChange}
      />
      <button onClick={()=>{
        handleEditSubmit();
      }}>Submit</button>
      <div className='text-red-700'>{error}</div>
    </div>
  )
}

export default ImageTest
