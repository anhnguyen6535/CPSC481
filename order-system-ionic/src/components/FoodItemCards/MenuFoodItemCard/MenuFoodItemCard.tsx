import React, { useState } from "react";
import {
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import { bookmark } from "ionicons/icons";
import CounterButton from "../CounterButton/CounterButton";
import DietIcons from "../DietIcons";
import { useHistory } from "react-router-dom";
import { useTypedDispatch } from "../../../hooks/reduxHooks";
import { addToCart, removeFromCart } from "../../../redux/actions/cartActions";
import { getFoodImageUri } from "../../../../data/menuItems/utils";
import styles from "./MenuFoodItemCard.module.scss";
import { MenuItem } from "../../../types";
import useAlcoholConfirmation from "../../../hooks/useAlcoholConfirmation";
import AlcoholConfirmationDialog from "../../AlcoholConfirmationDialog/AlcoholConfirmationDialog";

interface MenuFoodCardProps {
  item: MenuItem;
  amount: number;
}

const formatPrice = (price: number) => {
  const priceStr = price.toFixed(2);
  return `$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({ item, amount }) => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const [pinned, setPinned] = useState(false);
  const { isAlcoholConfirmationOpen, openAlcoholConfirmation, closeAlcoholConfirmation } = useAlcoholConfirmation();

  const addFoodToCart = () => {
    if(item.alcoholic && amount == 0) {
      openAlcoholConfirmation();
    }

    dispatch(addToCart(item));
  };

  const removeFoodFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const navigateToDetails = () => {
    history.push(`/details/${item.id}`);
  };

  return (
    <>
    <IonCard className={styles.menuFoodCard} color="secondary">
      <div className={styles.cardContent} onClick={navigateToDetails}>
        <div className={styles.imageContainer}>
          <img
            src={getFoodImageUri(item.imagePath)}
            alt={item.name}
            className={styles.cardImage}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
              <IonCardTitle className={styles.cardTitle}>
                {item.name}
              </IonCardTitle>
              <IonCardSubtitle>{formatPrice(item.price)}</IonCardSubtitle>
              <DietIcons
                diets={item.diets}
              />
            </div>
            <IonIcon
              icon={bookmark}
              size="small"
              color={pinned ? "primary" : "medium"}
              className={styles.bookmarkIcon}
            />
          </div>
          <div className={styles.counterButton}>
            <CounterButton
              amount={amount}
              enableTrash={false}
              onAdd={addFoodToCart}
              onRemove={removeFoodFromCart}
              enableAdd
            />
          </div>
        </div>
      </div>
    </IonCard>
    <AlcoholConfirmationDialog isOpen={isAlcoholConfirmationOpen} onClose={closeAlcoholConfirmation} />
    </>
  );
};

export default MenuFoodItemCard;
