import { IonContent} from '@ionic/react';
import './Pay.css';
import { OrderFoodItemCard } from '../components/FoodItemCards';
import foodData from "../../data/cartItems/data.json";
import { getFoodImageUri } from "../../data/menuItems/utils";
import Layout from '../components/Layout';

const Pay: React.FC = () => {
  return (
    <Layout>
        {foodData.map((foodItem) => (
                <OrderFoodItemCard
                  key={foodItem.id}
                  name={foodItem.name}
                  imagePath={getFoodImageUri(foodItem.imagePath)}
                  price={foodItem.price} 
                  amount={1}              />
              ))}
    </Layout>
  );
};

export default Pay;
