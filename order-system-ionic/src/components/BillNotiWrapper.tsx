import { IonIcon } from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import React from "react";
import { useTypedSelector } from "../hooks/reduxHooks";
import { selectIsBillOrdered } from "../redux/selectors/billSelectors";
import Layout from "./Layout";
import styles from "../pages/OrderPlaced/OrderPlaced.module.scss";

interface BillNotiWrapperProps {
  children: React.ReactNode;
}

const BillNotiWrapper: React.FC<BillNotiWrapperProps> = ({ children }) => {
  const isBillOrdered = useTypedSelector(selectIsBillOrdered);

  return (
    <>
      {isBillOrdered ? (
        <Layout
          pageTitle="Bill Requested"
          backButton={false}
          scroll={false}
          callWaiter={true}
        >
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "flex-start",
              marginTop: "5vh",
            }}
          >
            <div className={styles.orderPlaced}>
              <IonIcon
                className={styles.checkMark}
                icon={checkmarkOutline}
                style={{ color: "#fff" }}
              />
              <div className={styles.messageBox}>
                <h4>A waiter will be with you shortly with the bill</h4>
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default BillNotiWrapper;
