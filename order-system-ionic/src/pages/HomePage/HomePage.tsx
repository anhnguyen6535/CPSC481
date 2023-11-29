import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
import restaurantImage from "../../../assets/restaurant.png";

const categories = ["All", "Entrees", "Desserts", "Main Courses", "Beverages", "Alcoholic Beverages"];

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
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filters, setFilters] = useState(filterCategories);
  const [filterPrice, setFilterPrice] = useState<number | null>(null);

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

  const popover = useRef<HTMLIonPopoverElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setPopoverOpen(true);
  };

  const filteredFoodData = getFoodItems().filter(
    (foodItem) =>
      foodItem.item.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (selectedCategory === "All" ||
        foodItem.item.labels.includes(selectedCategory.slice(0, -1))) &&
      filters.every(
        (filter) =>
          !filter.checked ||
          // @ts-ignore
          foodItem.item.diets[filter.name]
      ) 
      &&
      (filterPrice == null || foodItem.item.price <= filterPrice)
  );

  const handleSearchChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setSearchText(query);
  };

  const handleFilterPriceChange = (value: number | null) => {
    setFilterPrice(value);
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
            debounce={700}
            onIonInput={(ev) => handleSearchChange(ev)}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          />
          <IonButton
            id="filter-trigger"
            fill="solid"
            slot="end"
            color="secondary"
            onClick={openPopover}
          >
            <IonIcon slot="start" icon={options} />
            Filter
          </IonButton>
          <IonPopover
            ref={popover}
            isOpen={popoverOpen}
            onDidDismiss={() => setPopoverOpen(false)}
          >
            <FilterComponent
              filters={filters}
              setFilters={setFilters}
              price={filterPrice}
              handlePrice={handleFilterPriceChange}
              isOpen={popoverOpen}
              setIsOpen={setPopoverOpen}
            />
          </IonPopover>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY>
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
        <div style={{marginBottom: 70}}>
          {filteredFoodData.length > 0 ? (
            filteredFoodData.map((foodItem) => (
              <MenuFoodItemCard
                key={foodItem.item.id}
                item={foodItem.item}
                amount={foodItem.quantity}
              />
            ))
          ) : (
            <div className={styles.noSearchResults}>
              <div>
                <img
                  src={restaurantImage}
                  alt="No results found"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
              <p>We Could Not Find Any Results That Match Your Search</p>
            </div>
          )}
        </div>
        {cartData.totalQuantity > 0 && (
          <IonButton onClick={() => history.push("/cart")} className={styles.viewCartButton}>
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
