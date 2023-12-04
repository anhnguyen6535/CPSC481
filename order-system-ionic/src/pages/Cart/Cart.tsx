import { IonButton, IonItemDivider } from "@ionic/react";

import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { MenuFoodItemCard } from "../../components/FoodItemCards";
import TextCard from "../../components/FoodItemCards/TextCard";
import { useTypedDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import { selectCartData } from "../../redux/selectors/cartSelectors";
import { CardTypeEnum } from "../../components/FoodItemCards/MenuFoodItemCard/MenuFoodItemCard";
import styles from "./Cart.module.scss";
import { useHistory } from "react-router";
import cartImage from "../../../assets/cart.png";
import Divider from "../../components/Divider/Divider";
import DisplayCost from "../../components/PriceCards/DisplayCost";
import { placeOrder } from "../../redux/actions/orderActions";
import { emptyCart } from "../../redux/actions/cartActions";

const Cart: React.FC = () => {
  const history = useHistory();
  const dispatch = useTypedDispatch();
  const [subtotal, setSubtotal] = useState(0.0);

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

  const handleOrderPlaced = () => {
    dispatch(placeOrder(cartData.items));
    history.push("/order-placed");
    setTimeout(() => dispatch(emptyCart()), 1000);
  };

  return (
    <Layout pageTitle="Your Order" backButton={true}>
      {cartData.items.length > 0 ? (
        <>
          {cartData.items.map((foodItem) => (
            <MenuFoodItemCard
              key={foodItem.item.id}
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

          <DisplayCost subtotal={subtotal} />

          <div className="ion-text-center">
            <IonButton
              onClick={handleOrderPlaced}
              className={styles.placeOrderButton}
            >
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
