import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Welcome.css';
import Layout from '../components/Layout';

const Welcome: React.FC = () => {
  return (
    <Layout pageTitle='Flavour of Calgary'>
      <h3>Welcome</h3>
    </Layout>
  );
};

export default Welcome;
