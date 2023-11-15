import React, { useState } from "react";
import {
  IonButton,
  IonSearchbar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonChip,
  IonBadge,
  IonAlert,
} from "@ionic/react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
// @ts-ignore
import HelpDeskIcon from "../../../assets/HelpIcon.svg";
import foodData from "../../../data/menuItems/data.json";
import { getFoodImageUri } from "../../../data/menuItems/utils";
import { options } from "ionicons/icons";
import Dialog, { ButtonProps } from "../../components/Dialog/Dialog";
import styles from "./HomePage.module.scss";



const categories = ["All", "Entrees", "Desserts", "Main Course", "Beverages"];

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [foodCartCount, setFoodCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showWaiterCallAlert, setShowWaiterCallAlert] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);


  const handleAddToCart = (price: number) => {
    setFoodCartCount((prevCount) => prevCount + 1);
    setTotalCost((prevTotal) => prevTotal + price);
  };

  const handleRemoveFromCart = (price: number) => {
    setFoodCartCount((prevCount) => prevCount - 1);
    setTotalCost((prevTotal) => prevTotal - price);
  };

  const callWaiterDialogButtons: ButtonProps[] = [
    {
      text: "Call Waiter",
      primary: true,
      onClick: () => {
        setShowWaiterCallAlert(false);
        setShowConfirmationAlert(true);
      },
    },
    {
      text: "Cancel",
      primary: false,
      onClick: () => {
        setShowWaiterCallAlert(false);
      },
    },
  ];

  const waiterConfirmationButtons: ButtonProps[] = [
    {
      text: "Okay",
      primary: false,
      onClick: () => {
        setShowConfirmationAlert(false);
      },
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-left">Flavour of Calgary</IonTitle>
          <IonButton
            onClick={() => setShowWaiterCallAlert(true)}
            fill="solid"
            color="primary"
            slot="end"
            style={{ textTransform: "none" }}
          >
            Call Waiter{" "}
            <IonIcon style={{ marginLeft: 10 }} icon={HelpDeskIcon} />
          </IonButton>
        </IonToolbar>
        <IonToolbar color="light">
          <IonSearchbar
             style={{
              '--background': '#efeff0',  
              '--border-radius': '15px'
            }}
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonButton fill="solid" slot="end" color="secondary">
            <IonIcon slot="start" icon={options} />
            Filter
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <div className={styles.categoryBar}>
            {categories.map((category, idx) => (
              <IonChip
                onClick={() => setSelectedCategory(category)}
                className={
                  category === selectedCategory ? styles.categoryItemSelected : ""
                }
                key={idx}
              >
                {category}
              </IonChip>
            ))}
          </div>
        </IonToolbar>
        <IonContent>
          {foodData.map((foodItem) => (
            <MenuFoodItemCard
              key={foodItem.id}
              name={foodItem.name}
              imagePath={getFoodImageUri(foodItem.imagePath)}
              price={foodItem.price}
              diets={foodItem.diets}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </IonContent>
        {foodCartCount > 0 && (
          <IonButton className={styles.viewCartButton}>
            <div className={styles.viewCartButtonInner}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonBadge color="light" className={styles.cartCount}>
                  {foodCartCount}
                </IonBadge>
                {`Total: $${totalCost}`}
              </div>
              <div>VIEW CART</div>
            </div>
          </IonButton>
        )}
      </IonContent>

      <Dialog
        title="Are you sure you want to call a waiter?"
        content="This will notify a waiter to come to your table."
        buttons={callWaiterDialogButtons}
        isOpen={showWaiterCallAlert}
        onDismiss={() => setShowWaiterCallAlert(false)}
      />

      <Dialog
        title="Waiter called!"
        content="A waiter has been notified and will be with you shortly."
        buttons={waiterConfirmationButtons}
        isOpen={showConfirmationAlert}
        onDismiss={() => setShowConfirmationAlert(false)}
      />

    </IonPage>
  );
};

export default HomePage;
