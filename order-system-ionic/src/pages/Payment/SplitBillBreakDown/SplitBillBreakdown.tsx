import React, { useState } from "react";
import { IonButton } from "@ionic/react";
import Layout from "../../../components/Layout";
import { useTypedSelector } from "../../../hooks/reduxHooks";
import { selectSplitBillOrders } from "../../../redux/selectors/billSelectors";
import PersonOrderView from "../../../components/PersonOrderView/PersonOrderView";
import styles from "./SplitBillBreakdown.module.scss";
import BillConfirm from "../BillConfirm";

const SplitBillBreakdown: React.FC = () => {
  const personOrders = useTypedSelector(selectSplitBillOrders);
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(0);
  const [orderedBill, setOrderedBill] = useState(false);

  const handleUnclicked = () => {
    setOrderedBill(!orderedBill);
  };

  const handleToggle = (index: number) => {
    setOpenCardIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleBill = () => {
    setOrderedBill(true);
  };

  return (
    <Layout pageTitle="Price Breakdown" backButton={true}>
      <div className={styles.priceBreakdownContainer}>
        <div>
          {personOrders.map((personOrder, index) => (
            <PersonOrderView
              key={personOrder.personName}
              personOrder={personOrder}
              isOpen={openCardIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
        <div className="ion-text-center">
          <IonButton style={{ width: "80vw" }} onClick={handleBill}>
            Request Bills
          </IonButton>
        </div>
      </div>

      {orderedBill ? <BillConfirm handleClicked={handleUnclicked} /> : null}
    </Layout>
  );
};

export default SplitBillBreakdown;
