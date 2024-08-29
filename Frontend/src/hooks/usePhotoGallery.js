import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";

export function usePhotoGallery() {
  const [photos, setPhotos] = useState([]);

  const takePhoto = async () => {
    try {
      // Take a photo using the device camera
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      console.log("Photo captured:", photo);

      // Generate a unique filename
      const fileName = Date.now() + ".jpeg";

      // Add the new photo to the photos array
      const newPhotos = [
        {
          filepath: fileName,
          webviewPath: photo.webPath,
        },
        ...photos,
      ];
      setPhotos(newPhotos);

      console.log("Photos array updated:", newPhotos);

      // Save the photo to the filesystem (optional)
      await savePhoto(photo, fileName);
    } catch (error) {
      console.error("Error taking photo:", error);
    }
  };

  const savePhoto = async (photo, fileName) => {
    const base64Data = await base64FromPath(photo.webPath);

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  return {
    photos,
    takePhoto,
  };
}

// Helper function to convert
