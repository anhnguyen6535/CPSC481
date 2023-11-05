import { useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
} from '@ionic/react';
import { add, bookmark, egg, leaf, logoGoogle, remove, } from 'ionicons/icons';
import CounterButton from './CounterButton';
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
                <CounterButton amount={amount}></CounterButton>
            </div>
        </IonCard>
    );
};

export default MenuFoodItemCard;
