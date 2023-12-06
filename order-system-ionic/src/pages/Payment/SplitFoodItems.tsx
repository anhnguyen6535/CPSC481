import Layout from "../../components/Layout"
import { IonButton } from '@ionic/react';
// import './Pay.css';
import { SplitBillFoodItemCard } from '../../components/FoodItemCards';
import { useEffect, useState } from 'react';
import DisplayCost from '../../components/PriceCards/DisplayCost';
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { selectOrders } from '../../redux/selectors/orderSelectors';
import EmptyHandler from '../../components/Empty/EmptyHandler';
import BillConfirm from './BillConfirm';
import Divider from '../../components/Divider/Divider';

const SplitBill = () => {
  const [subtotal, setSubtotal] = useState(0.0);
  const orders = useTypedSelector(selectOrders);
  const [disable, setDisable] = useState(true);

  const dispatch = useTypedDispatch();
  // dispatch(addDiner(name)); // Add name
  // dispatch(removeDiner(name)); // Remove name
  // dispatch(selectPerson(itemId, personName)); // Select person
  // dispatch(deselectPerson(itemId, personName)); // Deselect person

  // useEffect(() => {

  // }, [orders]);

  

  return (
    <Layout pageTitle='Payment' backButton={true}>
      {orders.length > 0 ? (
        <>
          {orders.map((order) => (
            order.items.map((foodItem) => (
              <>
                {Array.from({ length: foodItem.quantity }, (_, index) => (
                  <>
                    <SplitBillFoodItemCard
                      key={`${foodItem.item.id}-${index}`}
                      item={foodItem.item}
                      amount={1}
                      names={["Alan", "Ahmed"]}
                    />
                    <Divider />
                  </>
                ))}
              </>
            ))
          ))}

          <DisplayCost subtotal={subtotal} itemBreakdown={false} />

          {/* 
          <div className="ion-text-center">
            <IonButton disabled={disable} slot='start' onClick={handleOneBill}>One Bill</IonButton>
            <IonButton disabled={disable} slot='end' onClick={handleSplitBill}>Split Bill</IonButton>
          </div>

          {orderedOneBill ? <BillConfirm handleClicked={handleUnclicked} /> : null}
          */}
          
        </>
      ) : <EmptyHandler content='order' />}
    </Layout>
  )
}

export default SplitBill