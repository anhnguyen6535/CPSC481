import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import DisplayCost from "../../components/PriceCards/DisplayCost";
import Divider from "../../components/Divider/Divider";
import styles from "./PersonOrderView.module.scss";
import { MenuItem } from "../../types";
import { OrderFoodItemCard } from "../FoodItemCards";
import { caretDownOutline, caretUpOutline } from "ionicons/icons";

interface SplitBillPersonOrder {
  personName: string;
  selectedItems: ({
    item: MenuItem | null;
    quantity: number;
    totalPrice: number;
  } | null)[];
}

interface PersonOrderViewProps {
  personOrder: SplitBillPersonOrder;
  isOpen: boolean;
  onToggle: () => void;
}

const PersonOrderView: React.FC<PersonOrderViewProps> = ({
  personOrder,
  isOpen,
  onToggle,
}) => {
  return (
    <IonCard
      className={`${styles.personOrderCard} ${isOpen ? styles.opened : ""}`}
    >
      <IonItem lines="none" detail={false} button onClick={onToggle}>
        <IonLabel>{personOrder.personName}</IonLabel>
        {isOpen ? (
          <IonIcon icon={caretUpOutline} slot="end" />
        ) : (
          <IonIcon icon={caretDownOutline} slot="end" />
        )}
      </IonItem>

      <IonCardContent
        className={`${styles.personOrderCardContent} ${
          isOpen ? styles.slideIn : styles.slideOut
        }`}
      >
        {personOrder.selectedItems.map((selectedItem) => (
          <React.Fragment key={selectedItem?.item?.id}>
            {selectedItem?.item && (
              <OrderFoodItemCard
                item={selectedItem.item}
                amount={selectedItem.quantity}
              />
            )}
          </React.Fragment>
        ))}
        <Divider />
        <DisplayCost
          subtotal={personOrder.selectedItems.reduce(
            (acc, item) => acc + (item ? item.totalPrice : 0),
            0
          )}
          itemBreakdown={false}
        />
      </IonCardContent>
    </IonCard>
  );
};

export default PersonOrderView;
