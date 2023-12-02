import { IonButton, IonItemDivider } from "@ionic/react";

import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
import TextCard from "../../components/FoodItemCards/TextCard";
import { useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";
import { CardTypeEnum } from "../../components/FoodItemCards/MenuFoodItemCard/MenuFoodItemCard";
import styles from "./Cart.module.scss";
import { useHistory } from "react-router";
import cartImage from "../../../assets/cart.png";
import Divider from "../../components/Divider/Divider";

const Cart: React.FC = () => {
  const history = useHistory();
  const [subtotal, setSubtotal] = useState(0.0);
  // fake data
  const taxRate = 0.05;
  const cartData = useTypedSelector(selectCartData);

  useEffect(() => {
    const calculatedSubtotal = cartData.items.reduce(
      (acc, foodItem) => acc + foodItem.item.price * foodItem.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [cartData]);

  const handleRedirectToHomePage = () => {
    history.replace("/home");
  };

  return (
    <Layout pageTitle="Your Order" backButton={true}>
      {cartData.items.length > 0 ? (
        <>
          {cartData.items.map((foodItem) => (
            <MenuFoodItemCard
              item={foodItem.item}
              amount={foodItem.quantity}
              type={CardTypeEnum.CART}
              note={foodItem.specialInstructions}
            />
          ))}

          <div className="ion-text-center">
            <IonButton fill="clear" onClick={handleRedirectToHomePage}>
              Add More Items
            </IonButton>
          </div>

          <Divider />

          {cartData.items.map((foodItem, index) => (
            <TextCard
              key={foodItem.item.id}
              lines={index === cartData.items.length - 1 ? "" : "none"} // Line only for the last item
              label={`${foodItem.quantity}x ${foodItem.item.name}`}
              note={`${(foodItem.item.price * foodItem.quantity).toFixed(2)}`}
              noteColor="black"
            />
          ))}
          <TextCard
            lines="none"
            label="Subtotal"
            note={`${subtotal.toFixed(2)}`}
            noteColor="black"
          />
          <TextCard
            label="Tax"
            note={`${(subtotal * taxRate).toFixed(2)}`}
            noteColor="black"
          />
          <TextCard
            lines="none"
            label="Total"
            note={`${(subtotal * (1 + taxRate)).toFixed(2)}`}
            noteColor="black"
            fontWeight="bold"
          />

          <div className="ion-text-center">
            <IonButton className={styles.placeOrderButton}>
              Place Order
            </IonButton>
          </div>
        </>
      ) : (
        <div className={styles.noCartItems}>
          <div>
            <div>
              <img
                src={cartImage}
                alt="Cart is empty"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
            <p>There are no items in your cart.</p>
          </div>
          <IonButton
            onClick={handleRedirectToHomePage}
            className={styles.noCartItemsButton}
          >
            Add Items Now
          </IonButton>
        </div>
      )}
    </Layout>
  );
};

export default Cart;
