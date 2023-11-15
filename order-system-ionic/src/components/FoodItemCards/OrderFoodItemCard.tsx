import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import { formatPrice } from "./Utils";


interface CardProps {
    name: string;
    imagePath: string;
    price: number;
    amount: number;
};

const OrderFoodItemCard: React.FC<CardProps> = ({ name, imagePath, price, amount }) => {
    return (
        <IonCard style={{ borderRadius: '1rem', background: '0%', boxShadow: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name} x{amount}</IonCardTitle>
                </IonCardHeader>
                <IonCardTitle style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }}>{formatPrice(price * amount)}</IonCardTitle>
            </div>
        </IonCard>
    );
};

export default OrderFoodItemCard;
