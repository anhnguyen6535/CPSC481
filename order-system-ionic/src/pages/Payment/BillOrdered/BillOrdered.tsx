import { IonButton, IonIcon } from "@ionic/react";
import { checkmarkOutline } from "ionicons/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Layout from "../../../components/Layout";
import { orderBill } from "../../../redux/actions/billActions";
import { persistor } from "../../../redux/store";
import styles from "../../OrderPlaced/OrderPlaced.module.scss";

const BillOrdered = () => { 
    const history = useHistory();
    const dispatch = useDispatch();
    const resetTableHandler = () => {
        persistor.purge().then(() => history.push("/"));
    };

    useEffect(() =>{
        dispatch(orderBill());
    }, [])

  return (
    <Layout
        pageTitle="Bill Requested"
        backButton={false}
        scroll={false}
        callWaiter={true}
    >
        <div className={styles.container} >
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

            <div className={styles.buttonsContainer}>
                <div className={styles.buttonsInnerContainer}>
                    <IonButton
                    style={{ marginBottom: 20, width: "100%" }}
                    expand="block"
                    onClick={resetTableHandler}
                    >
                    New Session
                    </IonButton>
                </div>
            </div>
        </div>
    </Layout>
  );
};

export default BillOrdered;