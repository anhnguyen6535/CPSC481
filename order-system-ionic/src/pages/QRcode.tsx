import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './QRcode.css';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome</IonTitle>
          </IonToolbar>
        </IonHeader>
		<div className="scan-QR-code">
            <div className="visor-container-wrapper">
                <div className="visor-container">
                    <img className="action-close" alt="Action close" src="action-close.svg" />
                    <img className="vector-stroke" alt="Vector stroke" src="vector-6-stroke.svg" />
                    <img className="img" alt="Vector stroke" src="vector-9-stroke.svg" />
                    <img className="vector-stroke-2" alt="Vector stroke" src="vector-7-stroke.svg" />
                    <img className="vector-stroke-3" alt="Vector stroke" src="vector-8-stroke.svg" />
                </div>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};