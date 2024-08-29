import React, { useRef, useState } from "react";
import axios from 'axios';


// Upload the captured image to your server
async function uploadImage(file) {
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const response = await fetch("http://localhost:3456/api/v1/users/cloudinarylink", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Uploaded image URL:", data.url);
      return data.url;
    } else {
      console.error("Failed to upload image:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error during image upload:", error);
    return null;
  }
}

// Make a request to compare the uploaded image to the fixed URL
// async function compareFaces(uploadedUrl) {
//   const fixedUrl = "https://res.cloudinary.com/dgbgxtsrl/image/upload/v1724934200/tr37uzudxcdqe7lfnagr.png";
  
//   const apiUrl = `https://face-comparison1.p.rapidapi.com/face_comparison?url_1=${encodeURIComponent(uploadedUrl)}&url_2=${encodeURIComponent(fixedUrl)}`;
  
//   console.log(uploadedUrl)
//   try {
//     const response = await fetch(apiUrl, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': '7f03fa4ba7mshd1998b0af8a80f0p1f0919jsnf5fbd62725b8',
//         'x-rapidapi-host': 'face-comparison1.p.rapidapi.com',
//         'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'
//           }
//     });

//     console.log("dataincpmfaces")
//     console.log(response)
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log("Comparison result:", data);
//       return data;
//     } else {
//       console.error("Failed to compare faces:", await response.text());
//       return null;
//     }
//   } catch (error) {
//     console.error("Face comparison error:", error);
//     return null;
//   }
// }

// async function compareFaces(uploadedUrl) {
//   const fixedUrl = "https://res.cloudinary.com/dgbgxtsrl/image/upload/v1724934200/tr37uzudxcdqe7lfnagr.png";
  
//   const apiUrl = "https://face-compare1.p.rapidapi.com/v3/tasks/async/compare/face";
  
//   // Prepare the request payload
//   const payload = JSON.stringify({
//     task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1", // Use a valid task_id if available
//     group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e", // Use a valid group_id if available
//     data: {
//       document1: uploadedUrl,
//       document2: fixedUrl
//     }
//   });

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'x-rapidapi-key': '7f03fa4ba7mshd1998b0af8a80f0p1f0919jsnf5fbd62725b8',
//         'x-rapidapi-host': 'face-compare1.p.rapidapi.com',
//         'Content-Type': 'text/plain'
//       },
//       body: payload
//     });

//     console.log(response)

//     if (response.ok) {
//       const data = await response.json();
//       console.log("Comparison result:", data);
//       return data;
//     } else {
//       console.error("Failed to compare faces:", await response.text());
//       return null;
//     }
//   } catch (error) {
//     console.error("Face comparison error:", error);
//     return null;
//   }
// }



async function compareFaces(uploadedUrl) {
  const fixedUrl = "https://res.cloudinary.com/dgbgxtsrl/image/upload/v1724934200/tr37uzudxcdqe7lfnagr.png";

  // Convert URLs to base64 images (for demonstration purposes, actual implementation may vary)
  const convertToBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const [uploadedImageBase64, fixedImageBase64] = await Promise.all([
    convertToBase64(uploadedUrl),
    convertToBase64(fixedUrl)
  ]);

  // Prepare FormData
  const formData = new FormData();
  formData.append('image1Base64', uploadedImageBase64);
  formData.append('image2Base64', fixedImageBase64);

  try {
    const response = await axios.post(
      'https://face-verification2.p.rapidapi.com/faceverification',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-rapidapi-key': '83053069cdmsh7d25cf3da7e84a1p150cd1jsn12629eeb2228',
          'x-rapidapi-host': 'face-verification2.p.rapidapi.com'
        }
      }
    );





    /////////////////////////////////WE GET THE RESULT HERE OF FACE MATCH PERCENTAGE
    console.log("Comparison result:", response.data.data.similarPercent);
    return response.data;
  } catch (error) {
    console.error("Face comparison error:", error);
    return null;
  }
}



const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const photo = canvasRef.current.toDataURL("image/png");
    setCapturedPhoto(photo);
  };

  const savePhoto = () => {
    const a = document.createElement("a");
    a.href = capturedPhoto;
    a.download = "captured-photo.png";
    a.click();
  };

  const uploadCapturedPhoto = async () => {
    if (!capturedPhoto) return;

    // Convert base64 to Blob
    const blob = await (await fetch(capturedPhoto)).blob();

    // Convert Blob to File
    const file = new File([blob], "captured-photo.png", { type: "image/png" });

    // Upload the file to the server
    const uploadedUrl = await uploadImage(file);
    setUploadedImageUrl(uploadedUrl);

    // Perform face comparison after upload
    console.log("1")
    if (uploadedUrl) {
      console.log(uploadedUrl)
      console.log("2")
      const comparisonData = await compareFaces(uploadedUrl);
      console.log("3")
      console.log(comparisonData);
      console.log("4")
      if (comparisonData) {
        console.log("5")
        setComparisonResult(comparisonData);
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>

      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>

      {capturedPhoto && (
        <div>
          <img src={capturedPhoto} alt="Captured" />
          <button onClick={savePhoto}>Save Photo</button>
          <button onClick={uploadCapturedPhoto}>Upload and Compare Photo</button>
        </div>
      )}

      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={uploadedImageUrl} target="_blank" rel="noopener noreferrer">
            {uploadedImageUrl}
          </a>
        </div>
      )}

      {comparisonResult && (
        <div>
          <h3>Face Comparison Result</h3>
          <pre>{JSON.stringify(comparisonResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
