import { IonButton, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import styles from "./Waiter.module.scss";
import { persistor } from "../../redux/store";

const Waiter = () => {
  const history = useHistory();

  const resetTableHandler = () => {
  persistor.purge().then(() => history.push("/"));
  };

  return (
    <Layout pageTitle="Waiter">
      <div className={styles.centerContainer}>
        <IonText className={styles.centerText}>
          Are you sure you want to reset this table?
          <h4>This action will reset all order history and bills.</h4>
        </IonText>
        <div className={styles.resetButton}>
          <IonButton onClick={resetTableHandler}>Yes, reset table</IonButton>
        </div>
      </div>
    </Layout>
  );
};

export default Waiter;
