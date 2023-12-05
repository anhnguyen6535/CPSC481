import { IonButton, IonText } from "@ionic/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Layout from "../../components/Layout";
import { resetBill } from "../../redux/actions/billActions";
import { resetOrder } from "../../redux/actions/orderActions";
import styles from "./Waiter.module.scss";

const Waiter = () => { 
    const dispatch = useDispatch();
    const history = useHistory()

    const resetTableHandler = () =>{
      dispatch(resetBill());
      dispatch(resetOrder());
      localStorage.clear();

      history.push('/');
    }

    return(
        <Layout pageTitle="Waiter">
          <div className={styles.centerContainer}>
            <IonText className={styles.centerText}>
              Are you sure you want to reset this table?
              <h4>This action will reset all order history and bills.</h4>
            </IonText>
            <div className={styles.resetButton}>
              <IonButton
                onClick={resetTableHandler}
              >
                Yes, reset table
              </IonButton>
            </div>
          </div>
        </Layout>
    )
}

export default Waiter;