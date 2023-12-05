import { IonButton } from "@ionic/react";
// import './Pay.css';
import { OrderFoodItemCard } from "../../components/FoodItemCards";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import DisplayCost from "../../components/PriceCards/DisplayCost";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { useHistory } from "react-router-dom";
import { selectOrders } from "../../redux/selectors/orderSelectors";
import EmptyHandler from "../../components/Empty/EmptyHandler";
import BillConfirm from "./BillConfirm";
import Divider from "../../components/Divider/Divider";
import orderImage from "../../../assets/order.png";
import styles from "./Pay.module.scss";
import { CartItem } from "../../types";

const consolidateItems = (items: CartItem[]) => {
  const consolidatedItems = items.reduce(
    (acc: CartItem[], current: CartItem) => {
      const foundItem = acc.find((item) => item.item.id === current.item.id);
      if (foundItem) {
        foundItem.quantity += current.quantity;
      } else {
        acc.push({ ...current });
      }
      return acc;
    },
    [] as CartItem[]
  );

  return consolidatedItems;
};

const Pay: React.FC = () => {
  const history = useHistory();
  const [subtotal, setSubtotal] = useState(0.0);
  const [orderedOneBill, setOrderedOneBill] = useState(false);
  const orders = useTypedSelector(selectOrders);
  const [disable, setDisable] = useState(true);

  const foodItemList = orders.flatMap((order) => order.items);
  const consolidatedItems = consolidateItems(foodItemList);

  useEffect(() => {
    const calculatedTotal = consolidatedItems.reduce((acc, foodItem) => {
      return acc + foodItem.item.price * foodItem.quantity;
    }, 0);

    setSubtotal(calculatedTotal);
    calculatedTotal > 0 ? setDisable(false) : setDisable(true);
  }, [orders]);

  const handleSplitBill = () => {
    history.push("/pay/split-bill");
  };

  const handleOneBill = () => {
    setOrderedOneBill(true);
  };

  const handleUnclicked = () => {
    setOrderedOneBill(!orderedOneBill);
  };

  return (
    <Layout pageTitle="Payment" backButton={true}>
      {orders.length > 0 ? (
        <>
          {consolidatedItems.map((foodItem) => (
            <>
              <OrderFoodItemCard
                key={foodItem.item.id}
                item={foodItem.item}
                amount={foodItem.quantity}
              />
              <Divider />
            </>
          ))}

          <DisplayCost subtotal={subtotal} itemBreakdown={false} />

          <div className={`${styles.buttonsContainer} ion-text-center`}>
            <div className={styles.buttonsInnerContainer}>
              <IonButton
                style={{ width: "100%" }}
                disabled={disable}
                onClick={handleOneBill}
              >
                One Bill
              </IonButton>
              <IonButton
                style={{ width: "100%" }}
                disabled={disable}
                fill="outline"
                onClick={handleSplitBill}
              >
                Split Bill
              </IonButton>
            </div>
          </div>

          {orderedOneBill ? (
            <BillConfirm handleClicked={handleUnclicked} />
          ) : null}
        </>
      ) : (
        <EmptyHandler content="order" image={orderImage} />
      )}
    </Layout>
  );
};

export default Pay;
