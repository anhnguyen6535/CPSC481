import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonButton,
} from '@ionic/react';
import { add, bookmark, egg, leaf, logoGoogle, remove, } from 'ionicons/icons';
import './FoodItemCard.css';

interface CardProps {
    name: string;
    imagePath: string;
    price: number;
    amount: number;
    diets: string[];
};

interface MenuCardProps extends CardProps {
    pinned: boolean;
};

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `\$${priceStr}`;
};

// TODO: Add icons for the diets
const dietsToIcon = (diets: string[]) => {
    const icons = [];
    for (const dietType of diets) {
        if (dietType === "vegan") {
            icons.push(<IonIcon icon={leaf} />)
        } else if (dietType === "vegetarian") {
            icons.push(<IonIcon icon={egg} />)
        } else if (dietType === "gluten-free") {
            icons.push(<IonIcon icon={logoGoogle} />)
        }
    }
    return icons;
};

const amountToButtons = (amount: number) => {
    // TODO: REMOVE TEST LINE BELOW
    amount = 1;
    if (amount === 0) {
        return (
                <IonButton color="primary" shape="round" fill="outline" size="small" style={{ position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%', textTransform: 'none' }}>Add</IonButton>
            );
    } else if (amount === 1) {
        return (
            <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%' }}>
                <IonButton color="primary" shape="round" fill="clear" size="small" style={{ marginRight: '0.5rem' }}>-</IonButton>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '0 0.5rem' }}>{amount}</span>
                <IonButton color="primary" shape="round" fill="clear" size="small" style={{ marginLeft: '0.5rem' }}>+</IonButton>
            </div>
        );
    } /* else if (amount === 2) {
        return (
            <div>
            <IonIcon icon={remove} />
            <IonButton color="primary" shape="round" fill="outline" size="small" style={{ position: 'absolute', bottom: 0, right: 0, padding: '1rem', width: '35%', textTransform: 'none' }}>{amount}</IonButton>
            </div>
        )
    } */
};

const MenuFoodItemCard: React.FC<MenuCardProps> = ({ name, imagePath, price, amount, diets, pinned }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <div style={{ display: 'flex', paddingTop: '0.5rem' }}>
                        {dietsToIcon(diets)}
                    </div>
                </IonCardHeader>
                <IonIcon icon={bookmark} style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }} />
                {amountToButtons(amount)}
            </div>
        </IonCard>
    );
};

export default MenuFoodItemCard;
