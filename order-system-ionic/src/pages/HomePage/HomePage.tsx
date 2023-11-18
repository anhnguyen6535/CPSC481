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
import { getFoodImageUri } from "../../../data/menuItems/utils";
import { options } from "ionicons/icons";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar";



const categories = ["All", "Entrees", "Desserts", "Main Course", "Beverages"];

const HomePage: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [foodCartCount, setFoodCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = (price: number) => {
    setFoodCartCount((prevCount) => prevCount + 1);
    setTotalCost((prevTotal) => prevTotal + price);
  };

  const handleRemoveFromCart = (price: number) => {
    setFoodCartCount((prevCount) => prevCount - 1);
    setTotalCost((prevTotal) => prevTotal - price);
  };

  return (
    <IonPage>
      <IonHeader>
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

    </IonPage>
  );
};

export default HomePage;
