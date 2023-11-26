import React, { useState } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import { bookmark } from "ionicons/icons";
import CounterButton from "./CounterButton";
import DietIcons, { DietProps } from "./DietIcons";
import { MenuItem } from "../../types";
import { useTypedDispatch } from "../../hooks/reduxHooks";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";
import { getFoodImageUri } from "../../../data/menuItems/utils";

interface MenuFoodCardProps {
  item: MenuItem;
}

const formatPrice = (price: number) => {
  const priceStr = price.toFixed(2);
  return `$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({ item }) => {
  const dispatch = useTypedDispatch();
  const [pinned, setPinned] = useState(false);
  const [amount, setAmount] = useState(0);

  const addFoodToCart = () => {
    dispatch(addToCart(item));
  };

  const removeFoodFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <IonCard style={{ borderRadius: "1rem" }} color="secondary">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          src={getFoodImageUri(item.imagePath)}
          alt={item.name}
          style={{
            width: "7.5rem",
            height: "7.5rem",
            objectFit: "cover",
            padding: "1rem",
            borderRadius: "25%",
          }}
        />
        <IonCardHeader>
          <IonCardTitle style={{ fontSize: "1.2rem" }}>{item.name}</IonCardTitle>
          <IonCardSubtitle>{formatPrice(item.price)}</IonCardSubtitle>
          <DietIcons
            vegan={item.diets.vegan}
            vegetarian={item.diets.vegetarian}
            glutenFree={item.diets.glutenFree}
          />
        </IonCardHeader>
        <IonIcon
          icon={bookmark}
          color={pinned ? "primary" : "medium"}
          style={{ position: "absolute", top: 0, right: 0, padding: "1rem" }}
        />
        <CounterButton
          amount={amount}
          showTrashIcon={false}
          onAdd={addFoodToCart}
          onRemove={removeFoodFromCart}
        ></CounterButton>
      </div>
    </IonCard>
  );
};

export default MenuFoodItemCard;
