import { Reducer } from 'redux';
import { CartActionTypes } from '../actionTypes';
import { CartItem } from '../../types';

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0
};

export const cartReducer: Reducer<CartState> = (state = initialState, action) => {
  switch(action.type) {
    case CartActionTypes.ADD_TO_CART: {
      let existingItemIndex = state.items.findIndex(
        cartItem => cartItem.item.id === action.payload.id
      );
      
      var newItems = [...state.items];
      let newTotalPrice = state.totalPrice;
      let newTotalQuantity = state.totalQuantity;

      if (existingItemIndex !== -1) {
        newItems[existingItemIndex].quantity += 1;
      } else {
        newItems.push({ item: action.payload, quantity: 1 });
      }

      newTotalPrice += action.payload.price;
      newTotalQuantity += 1;

      return { 
        ...state, 
        items: newItems,
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity
      };
    }
    case CartActionTypes.REMOVE_FROM_CART: {
      let existingItemIndex = state.items.findIndex(
        cartItem => cartItem.item.id === action.payload
      );

      if (existingItemIndex !== -1) {
        let newItems = [...state.items];
        let newTotalPrice = state.totalPrice;
        let newTotalQuantity = state.totalQuantity;

        if (newItems[existingItemIndex].quantity > 1) {
          newItems[existingItemIndex].quantity -= 1;
        } else {
          newItems.splice(existingItemIndex, 1);
        }

        newTotalPrice -= state.items[existingItemIndex].item.price;
        newTotalQuantity -= 1;

        return { 
          ...state, 
          items: newItems,
          totalPrice: newTotalPrice,
          totalQuantity: newTotalQuantity
        };
      }

      return state;        
    }

    case CartActionTypes.DELETE_FROM_CART: {
      let newItems = [...state.items];
      let newTotalPrice = state.totalPrice;
      let newTotalQuantity = state.totalQuantity;

      let existingItemIndex = state.items.findIndex(
        cartItem => cartItem.item.id === action.payload
      );

      newItems.splice(existingItemIndex, 1);

      newTotalPrice -= state.items[existingItemIndex].item.price * state.items[existingItemIndex].quantity;
      newTotalQuantity -= state.items[existingItemIndex].quantity;

      return { 
        ...state, 
        items: newItems,
        totalPrice: newTotalPrice,
        totalQuantity: newTotalQuantity
      };
      
    }

    default: 
      return state;
  }
};