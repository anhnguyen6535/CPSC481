import { CartActionTypes } from '../actionTypes';
import { MenuItem } from '../../types';

export const addToCart = (item: MenuItem) => ({
  type: CartActionTypes.ADD_TO_CART,
  payload: item,
});

export const removeFromCart = (itemId: number) => ({
  type: CartActionTypes.REMOVE_FROM_CART,
  payload: itemId,
});

export const deleteFromCart = (itemId: number) => ({
  type: CartActionTypes.DELETE_FROM_CART,
  payload: itemId,
});