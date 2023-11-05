import { useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonIcon,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import { add, bookmark, egg, leaf, logoGoogle, remove, trash } from 'ionicons/icons';
import './FoodItemCard.css';
import CounterButton from './CounterButton';
import { DietProps, DietIcons } from './DietIcons';

interface CardProps {
    name: string;
    imagePath: string;
    price: number;
    amount: number;
    diets: DietProps;
};

interface MenuCardProps extends CardProps {
    pinned: boolean;
};

interface SplitBillCardProps extends CardProps {
    names: string[];
};

const formatPrice = (price: number) => {
    const priceStr = price.toFixed(2);
    return `\$${priceStr}`;
};

const SplitBillFoodItemCard: React.FC<SplitBillCardProps> = ({ name, imagePath, price, diets, names }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <DietIcons vegan={diets.vegan} vegetarian={diets.vegetarian} glutenFree={diets.glutenFree} />
                </IonCardHeader>
                <IonList inset={true} style={{ position: 'absolute', right: 0, background: '0%' }}>
                    <IonItem>
                        <IonSelect shape="round" justify="end" placeholder="Split" multiple={true} cancelText="Cancel" okText="Split" interface="popover" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {names.map((name) => (
                                <IonSelectOption value={name}>{name}</IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </IonList>
            </div>
        </IonCard>
    );
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

// What pressing the trash button should do:
// https://stackoverflow.com/questions/44988996/react-removing-an-element-when-onclick
const CartFoodItemCard: React.FC<MenuCardProps> = ({ name, imagePath, price, amount, diets }) => {
    return (
        <IonCard style={{ borderRadius: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={imagePath} alt={name} style={{ width: '7.5rem', height: '7.5rem', objectFit: 'cover', padding: '1rem', borderRadius: '25%' }} />
                <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{formatPrice(price)}</IonCardSubtitle>
                    <DietIcons vegan={diets.vegan} vegetarian={diets.vegetarian} glutenFree={diets.glutenFree} />
                </IonCardHeader>
                <CounterButton amount={amount} showTrashIcon={true}></CounterButton>
            </div>
        </IonCard>
    );
};

const MenuFoodItemCard: React.FC<MenuCardProps> = ({ name, imagePath, price, amount, diets, pinned }) => {
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

export { MenuFoodItemCard, OrderFoodItemCard, CartFoodItemCard, SplitBillFoodItemCard };
