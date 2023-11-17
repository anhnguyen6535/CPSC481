import React, { useState } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonIcon } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import CounterButton from "./CounterButton";
import DietIcons, { DietProps } from "./DietIcons";

interface MenuFoodCardProps {
    name: string;
    imagePath: string;
    price: number;
    diets: DietProps;
    onAddToCart?: (price: number) => void;
    onRemoveFromCart?: (price: number) => void;
};

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({ name, imagePath, price, diets, onAddToCart, onRemoveFromCart }) => {
  const [pinned, setPinned] = useState(false);
  const [amount, setAmount] = useState(0);

  const addFoodToCart = () => {
      onAddToCart && onAddToCart(price);
  }

  const removeFoodFromCart = () => {
    onRemoveFromCart && onRemoveFromCart(price);
}

  return (
        <IonCard style={{ borderRadius: '1rem' }} color="secondary">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle style={{fontSize: '1.2rem'}}>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <DietIcons vegan={diets.vegan} vegetarian={diets.vegetarian} glutenFree={diets.glutenFree} />
                </IonCardHeader>
                <IonIcon icon={bookmark} color={pinned ? "primary" : "medium"} style={{ position: 'absolute', top: 0, right: 0, padding: '1rem' }} />
                <CounterButton amount={amount} showTrashIcon={false} onAdd={addFoodToCart} onRemove={removeFoodFromCart}></CounterButton>
            </div>
        </IonCard>
    );
};

export default MenuFoodItemCard;