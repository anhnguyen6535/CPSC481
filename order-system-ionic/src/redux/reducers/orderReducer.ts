import { Reducer } from "redux";
import { CartItem } from "../../types";
import { OrderActionTypes } from "../actionTypes";

interface Order {
  items: CartItem[];
}
interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export const OrderReducer: Reducer<OrderState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case OrderActionTypes.PLACE_ORDER: {
      const newOrders = [...state.orders];

      const payloadOrder = {
        items: action.payload,
      };

      newOrders.push(payloadOrder);

      return {
        ...state,
        orders: newOrders,
      };
    }

    default:
      return state;
  }
};