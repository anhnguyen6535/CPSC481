import { IonButton } from '@ionic/react';
// import './Pay.css';
import { OrderFoodItemCard } from '../../components/FoodItemCards';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import DisplayCost from '../../components/PriceCards/DisplayCost';
import { useTypedSelector } from "../../hooks/reduxHooks";
import { useHistory } from 'react-router-dom';
import { selectOrders } from '../../redux/selectors/orderSelectors';
import EmptyHandler from '../../components/Empty/EmptyHandler';
import BillConfirm from './BillConfirm';
import Divider from '../../components/Divider/Divider';

const Pay: React.FC = () => {
  const history = useHistory();
  const [subtotal, setSubtotal] = useState(0.0);
  const [orderedOneBill, setOrderedOneBill] = useState(false);
  const orders = useTypedSelector(selectOrders);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    const calculatedTotal = orders.reduce((acc, order) => {
      const orderTotal = order.items.reduce(
        (orderAcc, foodItem) => orderAcc + foodItem.item.price * foodItem.quantity,
        0
      );
      return acc + orderTotal;
    }, 0);
  
    setSubtotal(calculatedTotal);
    calculatedTotal > 0 ? setDisable(false) : setDisable(true);
  }, [orders]);  

  const handleSplitBill = () =>{
    history.push('/pay/add-diners');
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
              <>
                <OrderFoodItemCard
                  key={foodItem.item.id}
                  item={foodItem.item}
                  amount={foodItem.quantity}
                />
                <Divider />
              </>
            ))
          ))}

          <DisplayCost subtotal={subtotal} itemBreakdown={false}/>

          <div className="ion-text-center">
            <IonButton disabled={disable} slot='start' onClick={handleOneBill}>One Bill</IonButton>
            <IonButton disabled={disable} slot='end' onClick={handleSplitBill}>Split Bill</IonButton>
          </div>

          {orderedOneBill ? <BillConfirm handleClicked={handleUnclicked}/> :null}
        </>
      ) : <EmptyHandler content='order'/>}
    </Layout>
  );
};

export default Pay;
