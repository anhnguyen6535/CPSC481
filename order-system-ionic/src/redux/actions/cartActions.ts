import { CartActionTypes } from "../actionTypes";
import { MenuItem } from "../../types";

interface UpdateQuantityPayload {
  item: MenuItem;
  quantity: number;
  note: string;
}

interface AddToCartPayload {
  item: MenuItem;
  note: string;
}

export const addToCart = (item: MenuItem, note: string) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: { item, note } as AddToCartPayload,
});

export const removeFromCart = (itemId: number) => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: itemId,
});

export const deleteFromCart = (itemId: number) => ({
  type: CartActionTypes.DELETE_FROM_CART,
  payload: itemId,
});

export const updateQuantity = (
  item: MenuItem,
  quantity: number,
  note: string
) => ({
  type: CartActionTypes.UPDATE_QUANTITY,
  payload: { item, quantity, note } as UpdateQuantityPayload,
});
