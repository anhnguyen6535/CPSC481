import React, { useEffect, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import styles from "./OrderPlaced.module.scss";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import { checkmarkOutline } from "ionicons/icons";

const OrderPlaced: React.FC = () => {
  const history = useHistory();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    setTimeout(() => setProcessing(false), 2000);
  }, []);

  useEffect(() => {
    setProcessing(true);
  }, []);

  return (
    <Layout
      pageTitle={processing ? "Placing Order" : "Order Placed"}
      backButton={true}
    >
      <div style={{ height: "100%" }}>
        {processing ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.orderPlaced}>
              <IonIcon
                className={styles.checkMark}
                icon={checkmarkOutline}
                style={{ color: "#fff" }}
              />
              <div className={styles.messageBox}>
                <h4>Thank You for your order!</h4>
                <p>Your order is being prepared.</p>
              </div>
            </div>

            <div className={styles.buttonsContainer}>
              <div className={styles.buttonsInnerContainer}>
                <IonButton
                  style={{ marginBottom: 20, width: "100%" }}
                  expand="block"
                  onClick={() => history.push("/pay")}
                >
                  Continue to Payment
                </IonButton>
                <IonButton
                  fill="outline"
                  expand="block"
                  onClick={() => history.push("/home")}
                  style={{ width: "100%" }}
                >
                  Order More Items
                </IonButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderPlaced;
