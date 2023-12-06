import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { formatPrice } from "../Utils";
import SplitBillNameSelect from "../SplitBillNameSelect/SplitBillNameSelect";
import { MenuItem } from "../../../types";
import { getFoodImageUri } from "../../../../data/menuItems/utils";
import { Diner } from "../../../redux/reducers/billReducer";
import styles from "./SplitBillFoodItemCard.module.scss";

interface SplitBillFoodCardProps {
  item: MenuItem;
  amount: number;
  diners: Diner[];
}

const SplitBillFoodItemCard: React.FC<SplitBillFoodCardProps> = ({
  item,
  amount,
  diners,
}) => {
  return (
    <IonCard className={styles.ionCardContainer}>
      <div className={styles.divContent}>
        <img
          src={getFoodImageUri(item.imagePath)}
          alt={item.name}
          className={styles.cardImage}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className={styles.titleContainer}>
            <IonCardTitle className={styles.foodName}>{item.name}</IonCardTitle>
            <IonCardTitle className={styles.foodName}>
              Quantity: {amount}
            </IonCardTitle>

            <IonCardTitle className={styles.price}>
              {formatPrice(amount*item.price)}
            </IonCardTitle>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SplitBillNameSelect diners={diners}  itemId={item.id}/>
          </div>
        </div>
      </div>
    </IonCard>
  );
};

export default SplitBillFoodItemCard;
