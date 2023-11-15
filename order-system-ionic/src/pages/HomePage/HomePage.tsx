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
import "./HomePage.scss";
// @ts-ignore
import HelpDeskIcon from "../../../assets/HelpIcon.svg";
import foodData from "../../../data/menuItems/data.json";
import { getFoodImageUri } from "../../../data/menuItems/utils";
import { cart, options } from "ionicons/icons";
import CallWaiterModal from "../../components/WaiterCallModal/CallWaiterModal";

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

//   const handleCallWaiter = () => {
//     setShowWaiterCallAlert(false);
//     setShowConfirmationAlert(true);
//   };

//   const handleCancel = () => {
//     setShowWaiterCallAlert(false);
//   };

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
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonButton fill="clear" slot="end" color="primary">
            <IonIcon slot="start" icon={options} />
            Filter
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonToolbar>
          <div className="category-bar">
            {categories.map((category, idx) => (
              <IonChip
                onClick={() => setSelectedCategory(category)}
                className={
                  category === selectedCategory ? "category-item-selected" : ""
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
          <IonButton className="view-cart-button">
            <div className="view-cart-button-inner">
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonBadge color="light" className="cart-count">
                  {foodCartCount}
                </IonBadge>
                {`Total: $${totalCost}`}
              </div>
              <div>VIEW CART</div>
            </div>
          </IonButton>
        )}
      </IonContent>
      {/* <CallWaiterModal
        isOpen={showWaiterCallAlert}
        handleCallWaiter={handleCallWaiter}
        handleDismiss={handleCancel}
      /> */}

      <IonAlert
        isOpen={showWaiterCallAlert}
        onDidDismiss={() => setShowWaiterCallAlert(false)}
        header={"Are you sure you want to call a waiter?"}
        message={"This will notify a waiter to come to your table."}
        cssClass="my-alert"
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Call Waiter",
            handler: () => {
              setShowConfirmationAlert(true);
            },
          },
        ]}
      />

      <IonAlert
        isOpen={showConfirmationAlert}
        onDidDismiss={() => setShowConfirmationAlert(false)}
        header={"Waiter called!"}
        message={"A waiter has been notified and will be with you shortly."}
        cssClass="my-alert"
        buttons={["OK"]}
      />
    </IonPage>
  );
};

export default HomePage;
