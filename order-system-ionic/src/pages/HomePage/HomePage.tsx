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
  IonPopover,
} from "@ionic/react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
// @ts-ignore
import foodData from "../../../data/menuItems/data.json";
import { options } from "ionicons/icons";
import styles from "./HomePage.module.scss";
import NavBar from "../../components/Navbar/NavBar";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";

import FilterComponent from "../../components/Filter/FilterComponent";
import restaurantImage from "../../../assets/restaurant.png";
import { CardTypeEnum } from "../../components/FoodItemCards/MenuFoodItemCard/MenuFoodItemCard";
import { isPlatform } from "@ionic/react";
import CustomButton from "../../components/Custom/CustomeButton/CustomButton";
import { selectPinnedItems } from "../../redux/selectors/homepageSelector";

const categories = [
  "All",
  "Entrees",
  "Desserts",
  "Main Courses",
  "Beverages",
  "Alcoholic Beverages",
];

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

enum LastNoResultsAction {
  SEARCH = "search",
  CATEGORY = "category",
  FILTERS = "filters",
}

const HomePage: React.FC = () => {
  const cartData = useTypedSelector(selectCartData);
  const pinnedItems = useTypedSelector(selectPinnedItems);
  const history = useHistory();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [filters, setFilters] = useState(filterCategories);
  const [filterPrice, setFilterPrice] = useState<number | null>(null);

  const [lastNoResultsAction, setLastNoResultsAction] =
    useState<LastNoResultsAction | null>(null);

  const getFoodItems = () => {
    const cartItemMap = new Map(
      cartData.items.map((cartItem) => [cartItem.item.id, cartItem])
    );

    const newFoodData = foodData.map((foodItem) => {
      const currentCartItem = cartItemMap.get(foodItem.id);

      return {
        item: foodItem,
        quantity: currentCartItem ? currentCartItem.quantity : 0,
        pinned: pinnedItems.includes(foodItem.id),
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
      ) &&
      (filterPrice == null || foodItem.item.price <= filterPrice)
  );

  const handleSearchChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setSearchText(query);
    setLastNoResultsAction(LastNoResultsAction.SEARCH);
  };

  const handleFilterPriceChange = (value: number | null) => {
    setFilterPrice(value);
    setLastNoResultsAction(LastNoResultsAction.FILTERS);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setLastNoResultsAction(LastNoResultsAction.CATEGORY);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const handleClearCategory = () => {
    setSelectedCategory("All");
  };

  const handleClearFilters = () => {
    setFilters(filterCategories);
    setFilterPrice(null);
  };

  // Sorting function to move pinned items to the top
  const sortByPinned = (a: any, b: any) => {
    const isAPinned = a.pinned;
    const isBPinned = b.pinned;

    if (isAPinned && !isBPinned) {
      return -1;
    } else if (!isAPinned && isBPinned) {
      return 1;
    } else {
      return 0;
    }
  };

  const sortedFoodData = filteredFoodData.sort(sortByPinned);

  useEffect(() => {
    setLastNoResultsAction(LastNoResultsAction.FILTERS);
  }, [filters]);

  return (
    <IonPage>
      <IonHeader>
        <NavBar pageTitle="Flavour of Calgary" />
        <IonToolbar
          style={isPlatform("ios") ? { paddingTop: 10, marginLeft: -5 } : {}}
          color="light"
        >
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
          <CustomButton
            id="filter-trigger"
            fill="solid"
            slot="end"
            color="secondary"
            onClick={openPopover}
            style={
              isPlatform("ios")
                ? { padding: 12, marginRight: 5 }
                : { padding: 12, marginRight: 10 }
            }
          >
            <div className={styles.filterContainer}>
              <IonIcon icon={options} style={{ marginRight: 5 }} />
              Filter
            </div>
          </CustomButton>
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
                onClick={() => handleCategoryClick(category)}
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
        <div style={{ marginBottom: 70 }}>
          {sortedFoodData.length > 0 ? (
            sortedFoodData.map((foodItem) => (
              <MenuFoodItemCard
                key={foodItem.item.id}
                item={foodItem.item}
                amount={foodItem.quantity}
                type={CardTypeEnum.MENU}
                pinned={foodItem.pinned}
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
              <p>Sorry! We could not find any results that match your search.</p>
              {lastNoResultsAction === LastNoResultsAction.SEARCH && (
                <IonButton
                  onClick={handleClearSearch}
                  className={styles.clearButton}
                >
                  Clear Search
                </IonButton>
              )}
              {lastNoResultsAction === LastNoResultsAction.CATEGORY && (
                <IonButton
                  onClick={handleClearCategory}
                  className={styles.clearButton}
                >
                  Clear Category
                </IonButton>
              )}
              {lastNoResultsAction === LastNoResultsAction.FILTERS && (
                <IonButton
                  onClick={handleClearFilters}
                  className={styles.clearButton}
                >
                  Clear Filters
                </IonButton>
              )}
            </div>
          )}
        </div>
        {cartData.totalQuantity > 0 && (
          <IonButton
            onClick={() => history.push("/cart")}
            className={styles.viewCartButton}
            size={isPlatform("ios") ? "small" : "default"}
          >
            <div className={styles.viewCartButtonInner}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonBadge color="light" className={styles.cartCount}>
                  {cartData.totalQuantity}
                </IonBadge>
                {`Total: $${cartData.totalPrice.toFixed(2)}`}
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
