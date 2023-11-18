import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Order.css';
import Layout from '../components/Layout';

const Order: React.FC = () => {
  return (
    <Layout pageTitle='Your Cart' backButton={true}>
        <h3>CART</h3>
    </Layout>
  );
};

export default Order;
