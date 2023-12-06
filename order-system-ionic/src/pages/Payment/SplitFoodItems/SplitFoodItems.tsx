import Layout from "../../../components/Layout";
import { IonButton } from "@ionic/react";
import { SplitBillFoodItemCard } from "../../../components/FoodItemCards";
import { useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../redux/selectors/orderSelectors";
import EmptyHandler from "../../../components/Empty/EmptyHandler";
import Divider from "../../../components/Divider/Divider";
import {
  selectSplitBillItems,
} from "../../../redux/selectors/billSelectors";
import styles from "./SplitFoodItems.module.scss";
import React from "react";

const SplitBill: React.FC = () => {
  const orders = useTypedSelector(selectOrders);
  const splitBillItems = useTypedSelector(selectSplitBillItems);

  const dispatch = useTypedDispatch();

  const getDinersForItemId = (itemId: number) => {
    const splitBillItem = splitBillItems.find((item) => item.itemId === itemId);
    return splitBillItem ? splitBillItem.selectedPeople : [];
  };

  return (
    <Layout pageTitle="Your Order" backButton={true}>
      {orders.length > 0 ? (
        <div className={styles.splitFoodItemsContainer}>
          <div>
            {orders.map((order) =>
              order.items.map((foodItem) =>
                Array.from({ length: foodItem.quantity }, (_, index) => (
                  <React.Fragment key={`${foodItem.item.id}-${index}`}>
                    <SplitBillFoodItemCard
                      item={foodItem.item}
                      amount={1}
                      diners={getDinersForItemId(foodItem.item.id)}
                    />
                    <Divider />
                  </React.Fragment>
                ))
              )
            )}
          </div>

          <div className="ion-text-center">
            <IonButton style={{ width: "80vw" }}>Request Bills</IonButton>
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
