import React, { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonPage,
  IonTextarea,
} from "@ionic/react";
import styles from "./Details.module.scss";
import { getFoodImageUri } from "../../../data/menuItems/utils";
import foodData from "../../../data/menuItems/data.json";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import ReadMore from "../../components/ReadMore/ReadMore";
import CounterButton from "../../components/FoodItemCards/CounterButton/CounterButton";
import { ellipse } from "ionicons/icons";
import DietIcons from "../../components/FoodItemCards/DietIcons";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";

const Details: React.FC = () => {
  const { itemid } = useParams<{ itemid: string }>();
  const itemIdNumber = parseInt(itemid, 10);
  const cartData = useTypedSelector(selectCartData);

  const existingItem = cartData.items.find((item) => item.item.id === itemIdNumber);

  const [amount, setAmount] = useState(existingItem? existingItem.quantity : 1);

  const item = foodData.find((item) => item.id === itemIdNumber);

  const addFoodToCart = () => {
    setAmount((amount) => amount + 1);
  };

  const removeFoodFromCart = () => {
    if (amount > 1) {
      setAmount((amount) => amount - 1);
    }
  };

  return (
    <IonPage>
      <Layout pageTitle="Detail" backButton={true}>
        {item ? (
          <div className={styles.foodItemContainer}>
            <img
              src={getFoodImageUri(item.imagePath)}
              alt={item.name}
              className={styles.foodItemImage}
            />
            <div className={styles.foodItemDetails}>
              <div className={styles.itemNameAndPrice}>
                <h2>{item.name}</h2>
                <span className={styles.price}>{`$${item.price.toFixed(
                  2
                )}`}</span>
              </div>
              <div style={{ marginTop: -15 }}>
                <DietIcons diets={item.diets} />
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Description</div>
                <div className={styles.sectionContent}>
                  <ReadMore content={item.description} maxLength={100} />
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>Ingredients</div>
                <div className={styles.sectionContent}>
                  <ReadMore
                    content={item.ingredients.join(", ")}
                    maxLength={100}
                  />
                </div>
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  Special Instructions/Customizations
                </div>
                <div className={styles.specialInstructionsBox}>
                  <IonTextarea
                    rows={4}
                    fill="solid"
                    placeholder=" Enter instructions here..."
                    style={{ "--background": "#E7E7E7" }}
                    className={styles.myCustomTextarea}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0px",
              }}
            >
              <CounterButton
                amount={amount}
                showTrashIcon={false}
                onAdd={addFoodToCart}
                onRemove={removeFoodFromCart}
                enableAdd={false}
              />
            </div>

            <IonButton>
              Add {amount} to cart&nbsp;&nbsp;
              <IonIcon
                icon={ellipse}
                style={{
                  fontSize: "0.5rem",
                  verticalAlign: "middle",
                  margin: "0 0.1rem",
                }}
              />
              &nbsp;&nbsp;${amount * item.price}
            </IonButton>
          </div>
        ) : null}
      </Layout>
    </IonPage>
  );
};

export default Details;
