import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import foodData from "../../../data/cartItems/data.json";      // fake data for testing
import { getFoodImageUri } from '../../../data/menuItems/utils';
import { CartFoodItemCard, OrderFoodItemCard } from '../../components/FoodItemCards';
import TextCard from '../../components/FoodItemCards/TextCard';
import './Cart.css';

const Cart: React.FC = () => {
  const [subtotal, setSubtotal] = useState(0.0);
  // fake data
  const taxRate = 0.05;

  useEffect(() => {
    const calculatedSubtotal = foodData.reduce((acc, foodItem) => acc + foodItem.price, 0);
    setSubtotal(calculatedSubtotal);
  }, [foodData]);

  return (
    <Layout pageTitle='Your Order' backButton={true}>
      {foodData.map((foodItem) => (
        <CartFoodItemCard
          key={foodItem.id}
          name={foodItem.name}
          imagePath={getFoodImageUri(foodItem.imagePath)}
          price={foodItem.price}
          amount={1} />
      ))}

      {foodData.map((foodItem, index) => (
        <TextCard
          key={foodItem.id}
          lines={index === foodData.length - 1 ? '' : 'none'} // Line only for the last item
          label={`1x ${foodItem.name}`}
          note={`${foodItem.price}`}
          noteColor='black'
        />
      ))}
      <TextCard lines='none' label='Subtotal' note={`${subtotal}`} noteColor='black' />
      <TextCard label='Tax' note={`${subtotal * taxRate}`} noteColor='black' />
      <TextCard lines='none' label='Total' note={`${subtotal * (1 + taxRate)}`} noteColor='black' />

      <div className="ion-text-center"> {/* TODO: Make the button wider */}
        <IonButton>Place Order</IonButton>
      </div>

    </Layout>
  );
};

export default Cart;
