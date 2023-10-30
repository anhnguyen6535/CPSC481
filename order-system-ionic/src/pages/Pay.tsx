import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Pay.css';

const Pay: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pay</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pay</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Pay" />
      </IonContent>
    </IonPage>
  );
};

export default Pay;
