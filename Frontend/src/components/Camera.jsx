import React, { useRef, useState } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

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

  const savePhoto = () => {
    const a = document.createElement("a");
    a.href = capturedPhoto;
    a.download = "captured-photo.png";
    a.click();
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
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
