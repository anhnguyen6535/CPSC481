import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import CounterButton from "../CounterButton";
import DietIcons, { DietProps } from "../DietIcons";
import styles from "./MenuFoodItemCard.module.scss";

interface MenuFoodCardProps {
    name: string;
    imagePath: string;
    price: number;
    diets: DietProps;
    onAddToCart?: (price: number) => void;
    onRemoveFromCart?: (price: number) => void;
    onClick?: () => void;
}

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({ name, imagePath, price, diets, onAddToCart, onRemoveFromCart, onClick }) => {
    const [pinned, setPinned] = useState(false);
    const [amount, setAmount] = useState(0);

    const addFoodToCart = () => {
        onAddToCart && onAddToCart(price);
    }

    const removeFoodFromCart = () => {
        onRemoveFromCart && onRemoveFromCart(price);
    }

    return (
        <IonCard
            className={styles.menuFoodCard}
            color="secondary"
            onClick={onClick}
        >
            <div className={styles.cardContent}>
                <img src={imagePath} alt={name} className={styles.cardImage} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <DietIcons vegan={diets.vegan} vegetarian={diets.vegetarian} glutenFree={diets.glutenFree} />
                </IonCardHeader>
                <IonIcon icon={bookmark} color={pinned ? "primary" : "medium"} className={styles.bookmarkIcon} />
                <CounterButton amount={amount} showTrashIcon={false} onAdd={addFoodToCart} onRemove={removeFoodFromCart} />
            </div>
        </IonCard>
    );
};

export default MenuFoodItemCard;
