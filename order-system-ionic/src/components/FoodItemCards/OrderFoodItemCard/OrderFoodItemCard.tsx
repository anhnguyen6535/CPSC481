import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { getFoodImageUri } from "../../../../data/menuItems/utils";
import { MenuItem } from "../../../types";
import { formatPrice } from "../Utils";
import styles from "./OrderFoodItemCard.module.scss";


interface CardProps {
    item: MenuItem;
    amount: number;
};

const OrderFoodItemCard: React.FC<CardProps> = ({ 
    item,
    amount,
}) => {
    return (
        <IonCard className={styles.ionCardContainer}>
            <div className={styles.divContent} >
                <img src={getFoodImageUri(item.imagePath)} alt={item.name} className={styles.cardImage} />
                
                <div className={styles.contentContainer}>
                    <IonCardHeader style={{ flexWrap: 'wrap' }}>
                        <IonCardTitle className={styles.foodName}>{item.name}</IonCardTitle>
                        <IonCardTitle className={styles.foodName}>Quantity: {amount}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardTitle className={styles.price}>{formatPrice(item.price * amount)}</IonCardTitle>
                </div>       
            </div>
        </IonCard>
    );
};

export default OrderFoodItemCard;
