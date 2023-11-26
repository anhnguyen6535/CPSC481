import React, { useState } from "react";
import {
  IonButton,
  IonSearchbar,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
  IonChip,
  IonBadge,
} from "@ionic/react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
// @ts-ignore
import foodData from "../../../data/menuItems/data.json";
import { options } from "ionicons/icons";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";

const categories = ["All", "Entrees", "Desserts", "Main Course", "Beverages"];

const HomePage: React.FC = () => {
  const cartData = useTypedSelector(selectCartData);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getFoodItems = () => {
    const newFoodData = foodData.map((foodItem) => {
      const currentCartItem = cartData.items.find(
        (cartItem) => cartItem.item.id === foodItem.id
      );

      return {
        item: foodItem,
        quantity: currentCartItem ? currentCartItem.quantity : 0,
      };
    });

    return newFoodData;
  };

  return (
    <IonPage>
      <IonHeader>
        <NavBar pageTitle="Flavour of Calgary" />
        <IonToolbar color="light">
          <IonSearchbar
            style={{
              "--background": "#efeff0",
              "--border-radius": "15px",
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
                  category === selectedCategory
                    ? styles.categoryItemSelected
                    : ""
                }
                key={idx}
              >
                {category}
              </IonChip>
            ))}
          </div>
        </IonToolbar>
        <IonContent>
          {getFoodItems().map((foodItem) => (
            <MenuFoodItemCard
              key={foodItem.item.id}
              item={foodItem.item}
              amount={foodItem.quantity}
            />
          ))}
        </IonContent>
        {cartData.totalQuantity > 0 && (
          <IonButton className={styles.viewCartButton}>
            <div className={styles.viewCartButtonInner}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonBadge color="light" className={styles.cartCount}>
                  {cartData.totalQuantity}
                </IonBadge>
                {`Total: $${cartData.totalPrice}`}
              </div>
              <div>VIEW CART</div>
            </div>
          </IonButton>
        )}
      </IonContent>

    </IonPage>
  );
};

export default HomePage;
