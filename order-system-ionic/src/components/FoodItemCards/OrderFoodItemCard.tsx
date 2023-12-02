import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { getFoodImageUri } from "../../../data/menuItems/utils";
import { MenuItem } from "../../types";
import { CardTypeEnum } from "./MenuFoodItemCard/MenuFoodItemCard";
import { formatPrice } from "./Utils";
import styles from "./MenuFoodItemCard/MenuFoodItemCard.module.scss";


interface CardProps {
    item: MenuItem;
    amount: number;
};

const OrderFoodItemCard: React.FC<CardProps> = ({ 
    item,
    amount,
}) => {
    return (
        <IonCard style={{ borderRadius: '1rem', background: '0%', boxShadow: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={getFoodImageUri(item.imagePath)} alt={item.name} className={styles.cardImage} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <IonCardHeader style={{ flexWrap: 'wrap' }}>
                        <IonCardTitle>{item.name} x{amount}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardTitle style={{ marginLeft: 'auto', padding: '1rem' }}>{formatPrice(item.price * amount)}</IonCardTitle>
                </div>       
            </div>
        </IonCard>
    );
};

export default OrderFoodItemCard;
