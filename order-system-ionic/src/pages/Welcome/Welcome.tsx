import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import styles from "./Welcome.module.scss";

const Welcome: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonText className={styles.centerText}>Flavour of Calgary</IonText>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className={styles.welcomeContainer}>
          <IonText className={styles.welcomeText}>
            Welcome to Flavour of Calgary. Please scan the QR code at your
            table.
          </IonText>
          <div className={styles.QRButton}>
            <IonButton
              onClick={() => {
                history.push("/scan");
              }}
            >
              Scan QR Code
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
