import React, { useEffect } from "react";
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
import orderTechLogo from "../../../assets/ordertechlogo.png";

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

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <IonText className={styles.smallText} >Brought to you by:</IonText>
            <img className={styles.logo} src={orderTechLogo} alt="logo" />
          </div>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
