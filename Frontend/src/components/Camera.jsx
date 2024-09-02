import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

async function uploadImage(file) {
  console.log(file);
  const formData = new FormData();
  if (file && file instanceof File) {
    console.log("Appending file:", file);
    formData.append("photo", file);
  } else {
    console.error("Network Error. Cannot append to FormData.");
    return null;
  }

  try {
    const response = await fetch(
      "http://localhost:3456/api/v1/users/cloudinarylink",
      {
        method: "POST",
        headers: {
          "Content-Type": "multipart/formData",
        },
        body: formData,
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data.url;
    } else {
      console.error("NO NETWORK!!!!");
      return null;
    }
  } catch (error) {
    console.error("Failed due to network error");
    return null;
  }
}

async function compareFaces(uploadedUrl) {
  const fixedUrl =
    "https://firebasestorage.googleapis.com/v0/b/tsec-app.appspot.com/o/DevsMember%2F2024%2FJash.JPG?alt=media&token=9bdc90ec-805b-46af-a9ce-43d0a66b4b66";

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
    convertToBase64(fixedUrl),
  ]);

  const formData = new FormData();
  formData.append("image1Base64", uploadedImageBase64);
  formData.append("image2Base64", fixedImageBase64);

  try {
    const response = await axios.post(
      "https://face-verification2.p.rapidapi.com/faceverification",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-key":
            "83053069cdmsh7d25cf3da7e84a1p150cd1jsn12629eeb2228",
          "x-rapidapi-host": "face-verification2.p.rapidapi.com",
        },
      }
    );

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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    startCamera();
  }, []);

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
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const photo = canvasRef.current.toDataURL("image/png");
    setCapturedPhoto(photo);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setLoading(false);
    setSuccess(false);
    startCamera();
  };

  const uploadCapturedPhoto = async () => {
    if (!capturedPhoto) return;

    setLoading(true);

    const blob = await (await fetch(capturedPhoto)).blob();
    const file = new File([blob], "captured-photo.png", { type: "image/png" });
    console.log(file);
    const uploadedUrl = await uploadImage(file);
    // console.log(uploadedUrl);

    if (uploadedUrl) {
      const comparisonData = await compareFaces(uploadedUrl);
      if (comparisonData && comparisonData.data.similarPercent > 0.7) {
        setLoading(false);
        setSuccess(true);
        setTimeout(() => {
          navigate("/matchingalgo");
        }, 2000); // Wait 2 seconds before navigating
      } else {
        setLoading(false);
        alert("Face verification failed. Try again.");
      }
    } else {
      setLoading(false);
      alert("Image upload failed. Try again.");
    }
  };

  const takeMeToMeet = () => {
    navigate("/matchingalgo");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!capturedPhoto ? (
        <div className="relative">
          <video
            ref={videoRef}
            width="640"
            height="480"
            className="border-2 border-gray-300 rounded-lg"
          />
          <button
            onClick={capturePhoto}
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg font-bold"
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              ></div>
              <span className="mt-4 text-gray-700">Processing...</span>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center">
              <div className="text-green-500 text-lg font-bold">
                Verification Successful!
              </div>
              <span className="mt-4 text-gray-700">Redirecting...</span>
            </div>
          ) : (
            <div>
              <img
                src={capturedPhoto}
                alt="Captured"
                className="border-2 border-gray-300 rounded-lg"
              />
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={retakePhoto}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-bold"
                >
                  Retake
                </button>
                <button
                  onClick={takeMeToMeet}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: "none" }}
      ></canvas>
    </div>
  );
};

export default CameraCapture;
