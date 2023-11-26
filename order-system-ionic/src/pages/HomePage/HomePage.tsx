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
  IonAlert,
  IonModal,
  IonPopover,
} from "@ionic/react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
// @ts-ignore
import foodData from "../../../data/menuItems/data.json";
import { options } from "ionicons/icons";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/NavBar";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";


import FilterComponent from "../../components/Filter/FilterComponent";
import { Diets } from "../../types";
import restaurantImage from "../../../assets/restaurant.png";

const categories = ["All", "Entrees", "Desserts", "Main Course", "Beverages"];

const filterCategories = [
  {
    name: "vegetarian",
    label: "Vegetarian",
    checked: false,
  },
  {
    name: "vegan",
    label: "Vegan",
    checked: false,
  },
  {
    name: "halal",
    label: "Halal",
    checked: false,
  },
  {
    name: "glutenFree",
    label: "Gluten Free",
    checked: false,
  },
  {
    name: "pescatarian",
    label: "Pescatarian",
    checked: false,
  },
  {
    name: "nutFree",
    label: "Nut-free",
    checked: false,
  },
];

const HomePage: React.FC = () => {
  const cartData = useTypedSelector(selectCartData);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filters, setFilters] = useState(filterCategories);
  const [filterPrice, setFilterPrice] = useState<number>(0);

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

  const isDietProperty = (prop: string): prop is keyof Diets => {
    return prop === "vegan" || prop === "vegetarian" || prop === "glutenFree";
  };

  const filteredFoodData = foodData.filter(
    (foodItem) =>
      (foodItem.name.toLowerCase().includes(searchText.toLowerCase()) &&
        (selectedCategory === "All" ||
          foodItem.labels.includes(selectedCategory))) ||
      (foodItem.labels.includes(selectedCategory.slice(0, -1)) &&
        filters.every(
          (filter) =>
            !filter.checked ||
            (isDietProperty(filter.name) && foodItem.diets[filter.name])
        ))
  );

  const handleFilterChange = (index: number, newCheckedValue: boolean) => {
    setFilters(
      filters.map((filter, filterIndex) =>
        filterIndex === index ? { ...filter, checked: newCheckedValue } : filter
      )
    );
  };

  const handleSearchChange = (ev: Event) => {
    let query = '';
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setSearchText(query);
  };


  const handleFilterPriceChange = (e: CustomEvent) => {};

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
            debounce={700} 
            onIonInput={(ev) => handleSearchChange(ev)}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonButton
            id="filter-trigger"
            fill="solid"
            slot="end"
            color="secondary"
          >
            <IonIcon slot="start" icon={options} />
            Filter
          </IonButton>
          <IonPopover trigger="filter-trigger" triggerAction="click">
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              price={filterPrice}
              handlePrice={handleFilterPriceChange}
            />
          </IonPopover>
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
          {filteredFoodData.length > 0 ? (
            filteredFoodData.map((foodItem) => (
              <MenuFoodItemCard key={foodItem.id} item={foodItem} amount={0}/>
            ))
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                src={restaurantImage}
                alt="No results found"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <p>We could not find any results that match your search.</p>
            </div>
          )}
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
