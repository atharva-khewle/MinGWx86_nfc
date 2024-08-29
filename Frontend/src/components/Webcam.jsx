import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { camera } from "ionicons/icons";
import { usePhotoGallery } from "../hooks/usePhotoGallery";

const WebCam = () => {
  const { photos, takePhoto } = usePhotoGallery();

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          {photos.map((photo, index) => (
            <IonCol size="6" key={photo.filepath}>
              <IonImg src={photo.webviewPath} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={takePhoto}>
          <IonIcon icon={camera} />
        </IonFabButton>
      </IonFab>
    </IonContent>
  );
};

export default WebCam;
