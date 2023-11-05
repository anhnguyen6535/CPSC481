import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import CounterButton from "./CounterButton";
import DietIcons, { DietProps } from "./DietIcons";


interface MenuFoodCardProps {
    name: string;
    imagePath: string;
    price: number;
    amount: number;
    diets: DietProps;
    pinned: boolean;
};

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `\$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({ name, imagePath, price, amount, diets, pinned }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <DietIcons vegan={diets.vegan} vegetarian={diets.vegetarian} glutenFree={diets.glutenFree} />
                </IonCardHeader>
                {/* TODO: Change color of the pin icon based on whether it's pinned or not */}
                <IonIcon icon={bookmark} style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }} />
                <CounterButton amount={amount} showTrashIcon={false}></CounterButton>
            </div>
        </IonCard>
    );
};

export default MenuFoodItemCard;