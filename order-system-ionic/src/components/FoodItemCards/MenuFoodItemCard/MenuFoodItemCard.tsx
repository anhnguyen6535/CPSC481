import React, { useState } from "react";
import { IonCard, IonCardTitle, IonCardSubtitle, IonIcon } from "@ionic/react";
import { bookmark, trashOutline } from "ionicons/icons";
import CounterButton from "../CounterButton/CounterButton";
import DietIcons from "../DietIcons";
import { useHistory } from "react-router-dom";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/reduxHooks";
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from "../../../redux/actions/cartActions";
import { getFoodImageUri } from "../../../../data/menuItems/utils";
import styles from "./MenuFoodItemCard.module.scss";
import { MenuItem } from "../../../types";
import { selectIsIdVerified } from "../../../redux/selectors/alcoholDialogSelectors";
import { openAlcoholDialog } from "../../../redux/actions/alcoholDialogActions";

export enum CardTypeEnum {
  MENU = "MENU",
  CART = "CART",
}

interface MenuFoodCardProps {
  item: MenuItem;
  amount: number;
  type: CardTypeEnum;
  note?: string;
}

const formatPrice = (price: number) => {
  const priceStr = price.toFixed(2);
  return `$${priceStr}`;
};

const MenuFoodItemCard: React.FC<MenuFoodCardProps> = ({
  item,
  amount,
  type,
  note,
}) => {
  const specialInstructionMaxLength = 14;
  const history = useHistory();
  const isAlcoholIdVerified = useTypedSelector(selectIsIdVerified);
  const dispatch = useTypedDispatch();
  const [pinned, setPinned] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  console.log("HHHHHH: ", showTooltip);

  const addFoodToCart = () => {
    if (item.alcoholic && amount == 0 && !isAlcoholIdVerified) {
      dispatch(openAlcoholDialog());
    }

    dispatch(addToCart(item, note || ""));
  };

  const removeFoodFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const navigateToDetails = () => {
    history.push(`/details/${item.id}`);
  };

  const handleIconClick = (
    event:
      | React.MouseEvent<HTMLIonIconElement, MouseEvent>
      | React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    if (type == CardTypeEnum.CART) {
      dispatch(deleteFromCart(item.id));
    } else {
      // handle pinning functionality
    }

    event.stopPropagation();
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
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
                <DietIcons diets={item.diets} />
              </div>
              <span
                className={styles.iconContainer}
                onClick={(event) => event.stopPropagation()}
              >
                <IonIcon
                  icon={type === CardTypeEnum.MENU ? bookmark : trashOutline}
                  size="small"
                  color={pinned ? "primary" : "medium"}
                  className={styles.bookmarkIcon}
                  onClick={(event) => handleIconClick(event)}
                />
              </span>
            </div>
            {note && (
              <div
                className={styles.specialInstructionsContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p
                  className={
                    showTooltip ? styles.hide : styles.specialInstructions
                  }
                >
                  {note.length <= specialInstructionMaxLength
                    ? note
                    : `${note.slice(0, specialInstructionMaxLength)}...`}
                </p>
                <p
                  className={
                    showTooltip ? styles.specialInstructionsFull : styles.hide
                  }
                >
                  {note.length <= specialInstructionMaxLength
                    ? note
                    : `${note.slice(0, specialInstructionMaxLength)}...`}
                </p>
                {showTooltip && <div className={styles.tooltip}>{note}</div>}
              </div>
            )}
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
    </>
  );
};

export default MenuFoodItemCard;
