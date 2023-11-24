import { IonButton, IonCard, IonCardContent} from '@ionic/react';
// import './Pay.css';
import { OrderFoodItemCard } from '../components/FoodItemCards';
import foodData from "../../data/cartItems/data.json";      // fake data for testing
import { getFoodImageUri } from "../../data/menuItems/utils";
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import TextCard from '../components/FoodItemCards/TextCard';

const Pay: React.FC = () => {
  const [subtotal, setSubtotal] = useState(0.0);
  // fake data
  const taxRate = 0.05;

  useEffect(() => {
    const calculatedSubtotal = foodData.reduce((acc, foodItem) => acc + foodItem.price, 0);
    setSubtotal(calculatedSubtotal);
  }, [foodData]);

  return (
    <Layout pageTitle='Your Order' backButton={true}>
        <IonCard>
          <IonCardContent>
                {foodData.map((foodItem) => (
                        <OrderFoodItemCard
                          key={foodItem.id}
                          name={foodItem.name}
                          imagePath={getFoodImageUri(foodItem.imagePath)}
                          price={foodItem.price} 
                          amount={1}              />
                      ))} 
          </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <TextCard lines='none' label='Subtotal' note={`${subtotal}`} />
              <TextCard label='Tax' note={`${subtotal*taxRate}`} />
              <TextCard lines='none' label='Total' note={`${subtotal*(1+taxRate)}`} />
            </IonCardContent>
          </IonCard>
          
          <div className="ion-text-center">
            <IonButton slot='start'>One Bill</IonButton>
            <IonButton slot='end'>Split Bill</IonButton>
          </div>
        
    </Layout>
  );
};

export default Pay;
