import Layout from "../../../components/Layout";
import { IonButton } from "@ionic/react";
import { SplitBillFoodItemCard } from "../../../components/FoodItemCards";
import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../redux/selectors/orderSelectors";
import EmptyHandler from "../../../components/Empty/EmptyHandler";
import Divider from "../../../components/Divider/Divider";
import { selectSplitBillDiners } from "../../../redux/selectors/billSelectors";
import styles from "./SplitFoodItems.module.scss";

const SplitBill: React.FC = () => {
  const dinersList = useTypedSelector(selectSplitBillDiners);
  const [subtotal, setSubtotal] = useState(0.0);
  const orders = useTypedSelector(selectOrders);
  const [disable, setDisable] = useState(true);

  console.log("HHH: ", orders);

  const dispatch = useTypedDispatch();

  return (
    <Layout pageTitle="Your Order" backButton={true}>
      {orders.length > 0 ? (
        <div className={styles.splitFoodItemsContainer}>
          <div>
            {orders.map((order) =>
              order.items.map((foodItem) => (
                <>
                  {Array.from({ length: foodItem.quantity }, (_, index) => (
                    <>
                      <SplitBillFoodItemCard
                        key={`${foodItem.item.id}-${index}`}
                        item={foodItem.item}
                        amount={1}
                        diners={dinersList}
                      />
                      <Divider />
                    </>
                  ))}
                </>
              ))
            )}
          </div>

          <div className="ion-text-center">
            <IonButton style={{width: "80vw"}}>Request Bills</IonButton>
          </div>
        </div>
      ) : (
        <EmptyHandler
          content="order"
          image={""}
          buttonTitle={""}
          buttonAction={undefined}
        />
      )}
    </Layout>
  );
};

export default SplitBill;
