import { CartItem } from "../../types";
import { OrderActionTypes } from "../actionTypes";


export const placeOrder = (items: CartItem[]) => ({
  type: OrderActionTypes.PLACE_ORDER,
  payload: items,
});
