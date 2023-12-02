import { IonButton, IonCard, IonCardContent } from '@ionic/react';
// import './Pay.css';
import { OrderFoodItemCard } from '../../components/FoodItemCards';
import foodData from "../../../data/cartItems/data.json";      // fake data for testing
import { getFoodImageUri } from "../../../data/menuItems/utils";
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import TextCard from '../../components/FoodItemCards/TextCard';
import DisplayCost from '../../components/PriceCards/DisplayCost';
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";

const Pay: React.FC = () => {
  const [subtotal, setSubtotal] = useState(0.0);
  const cartData = useTypedSelector(selectCartData);

  useEffect(() => {
    const calculatedSubtotal = cartData.items.reduce(
        (acc, foodItem) => acc + foodItem.item.price * foodItem.quantity,
        0
    );
    setSubtotal(calculatedSubtotal);
  }, [cartData]);


  return (
    <Layout pageTitle='Your Order' backButton={true}>
      {cartData.items.map((foodItem) => (
        <OrderFoodItemCard
          item={foodItem.item}
          amount={foodItem.quantity} />
      ))}

      <DisplayCost subtotal={subtotal} />

      <div className="ion-text-center">
        <IonButton slot='start'>One Bill</IonButton>
        <IonButton slot='end'>Split Bill</IonButton>
      </div>

    </Layout>
  );
};

export default Pay;
