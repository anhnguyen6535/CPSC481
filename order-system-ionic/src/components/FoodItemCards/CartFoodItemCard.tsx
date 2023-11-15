import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from "@ionic/react";
import CounterButton from "./CounterButton";
import DietIcons from "./DietIcons";


interface CartFoodCardProps {
    name: string;
    imagePath: string;
    price: number;
    amount: number;
};

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `\$${priceStr}`;
};

// What pressing the trash button should do:
// https://stackoverflow.com/questions/44988996/react-removing-an-element-when-onclick
const CartFoodItemCard: React.FC<CartFoodCardProps> = ({ name, imagePath, price, amount }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                </IonCardHeader>
                <CounterButton amount={amount} enableTrash={true}></CounterButton>
            </div>
        </IonCard>
    );
};

export default CartFoodItemCard;
