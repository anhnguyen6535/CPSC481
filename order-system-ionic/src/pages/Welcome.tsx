import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton} from '@ionic/react';
import './Welcome.css';
import { arrowBack, arrowBackCircle, backspace } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

const Welcome: React.FC = () => {
  const history = useHistory();
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
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<br></br>
		<h1>Welcome. Please scan the QR code on your table.</h1>
		<div id="QRButton">
			<IonButton onClick={(event)=> {history.push("/QRcode")}}>Scan QR Code</IonButton>
		</div>
	  </IonContent>
    </IonPage>
  );
};

export default Welcome;
