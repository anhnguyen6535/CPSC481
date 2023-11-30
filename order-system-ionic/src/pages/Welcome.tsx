import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Welcome.css';
import Layout from '../components/Layout';

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
        <div className="welcome-page">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="iphone-x-pro">
                        <div className="right-side">
                            <img className="battery" alt="Battery" src="battery.png" />
                            <img className="wifi" alt="Wifi" src="wifi.svg" />
                            <img className="mobile-signal" alt="Mobile signal" src="mobile-signal.svg" />
                        </div>
                        <img className="left-side" alt="Left side" src="left-side.png" />
                    </div>
                    <div className="frame">
                        <Component className="component-115" text="Scan QR Code" />
                        <p className="welcome-to-flavour">
                            Welcome to Flavour of Calgary.
                            <br />
                            Please scan the QR code at your table.
                        </p>
                        <div className="text-wrapper">Flavour of Calgary</div>
                    </div>
                </div>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};