import { IonButton } from '@ionic/react';
// import './Pay.css';
import { OrderFoodItemCard } from '../../components/FoodItemCards';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import DisplayCost from '../../components/PriceCards/DisplayCost';
import { useTypedSelector } from "../../hooks/reduxHooks";
import { useHistory } from 'react-router-dom';
import { selectOrders } from '../../redux/selectors/orderSelectors';
import BillOrdered from './BillOrdered';
import EmptyHandler from '../../components/Empty/EmptyHandler';

const Pay: React.FC = () => {
  const history = useHistory();
  const [subtotal, setSubtotal] = useState(0.0);
  const [orderedOneBill, setOrderedOneBill] = useState(false);
  const orders = useTypedSelector(selectOrders);

  useEffect(() => {
    const calculatedTotal = orders.reduce((acc, order) => {
      const orderTotal = order.items.reduce(
        (orderAcc, foodItem) => orderAcc + foodItem.item.price * foodItem.quantity,
        0
      );
      return acc + orderTotal;
    }, 0);
  
    setSubtotal(calculatedTotal);
  }, [orders]);  

  const handleSplitBill = () =>{
    history.push('/pay/split-bill')
  }

  const handleOneBill = () =>{
    setOrderedOneBill(true);
  }

  const handleUnclicked = () =>{
    setOrderedOneBill(!orderedOneBill);
  }

  return (
    <Layout pageTitle='Payment' backButton={true}>
      {orders.length > 0 ?(
        <>
          {orders.map((order) => (
            order.items.map((foodItem) => (
              <OrderFoodItemCard
                key={foodItem.item.id}
                item={foodItem.item}
                amount={foodItem.quantity}
              />
            ))
          ))}
          
          <DisplayCost subtotal={subtotal} />

          <div className="ion-text-center">
            <IonButton slot='start' onClick={handleOneBill}>One Bill</IonButton>
            <IonButton slot='end' onClick={handleSplitBill}>Split Bill</IonButton>
          </div>

          {orderedOneBill ? <BillOrdered handleClicked={handleUnclicked}/> :null}
        </>
      ) : <EmptyHandler content='order'/>}
    </Layout>
  );
};

export default Pay;
