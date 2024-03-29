import Layout from "../../../components/Layout";
import { IonButton, IonToast } from "@ionic/react";
import { SplitBillFoodItemCard } from "../../../components/FoodItemCards";
import { useTypedSelector } from "../../../hooks/reduxHooks";
import { selectOrders } from "../../../redux/selectors/orderSelectors";
import EmptyHandler from "../../../components/Empty/EmptyHandler";
import Divider from "../../../components/Divider/Divider";
import { selectSplitBillItems } from "../../../redux/selectors/billSelectors";
import styles from "./SplitFoodItems.module.scss";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { consolidateItems } from "../../../utils/utils";

const SplitBill: React.FC = () => {
  const history = useHistory();
  const orders = useTypedSelector(selectOrders);
  const foodItemList = orders.flatMap((order) => order.items);
  const consolidatedItems = consolidateItems(foodItemList);
  const splitBillItems = useTypedSelector(selectSplitBillItems);
  const [showEmptyDinerToast, setShowEmptyDinerToast] = useState(false);

  const getDinersForItemId = (itemId: number) => {
    const splitBillItem = splitBillItems.find((item) => item.itemId === itemId);
    return splitBillItem ? splitBillItem.selectedPeople : [];
  };

  const handleContinueClick = () => {
    const hasEmptyDiners = splitBillItems.some(
      (item) => item.selectedPeople.length === 0
    );
    const allItemsExist = orders.every((order) =>
      order.items.every((foodItem) =>
        splitBillItems.some((item) => item.itemId === foodItem.item.id)
      )
    );

    if (hasEmptyDiners || !allItemsExist) {
      setShowEmptyDinerToast(true);
    } else {
      history.push("/pay/split-bill-breakdown");
    }
  };

  const handleToastClose = () => {
    setShowEmptyDinerToast(false);
  };

  return (
    <Layout pageTitle="Your Order" backButton={true}>
      {consolidatedItems.length > 0 ? (
        <>
          <div>
            <div className={styles.splitFoodItemsContainer}>
              {consolidatedItems.map((item, index) => (
                <React.Fragment key={`${item.item.id}-${index}`}>
                  <SplitBillFoodItemCard
                    item={item.item}
                    amount={item.quantity}
                    diners={getDinersForItemId(item.item.id)}
                  />
                  <Divider />
                </React.Fragment>
              ))}
            </div>

            <div
              style={{ flexShrink: 0 }}
              className={`ion-text-center ${styles.sticky}`}
            >
              <IonButton
                onClick={handleContinueClick}
                style={{ width: "80vw" }}
              >
                Continue
              </IonButton>
            </div>
          </div>

          <IonToast
            isOpen={showEmptyDinerToast}
            onDidDismiss={handleToastClose}
            message="Please assign at least one diner to each item before continuing."
            duration={3000}
            color="danger"
            position="top"
          />
        </>
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
