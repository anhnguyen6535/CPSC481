import { Reducer } from "redux";
import { HomePageActionTypes } from "../actionTypes";
import { MenuItem } from "../../types";
import { PURGE } from "redux-persist";

interface HomepageState {
  pinnedItems: number[];
}

const initialState: HomepageState = {
  pinnedItems: [],
};

export const HomepageReducer: Reducer<HomepageState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case HomePageActionTypes.PIN_CARD: {
      const currentPinnedItem = [...state.pinnedItems];
      if (currentPinnedItem.indexOf(action.payload) === -1) {
        currentPinnedItem.push(action.payload);
      }

      return {
        ...state,
        pinnedItems: currentPinnedItem,
      };
    }

    case HomePageActionTypes.UNPIN_CARD: {
      const currentPinnedItem = [...state.pinnedItems];

      const existingItemIndex = currentPinnedItem.indexOf(action.payload);

      if (existingItemIndex !== -1) {
        currentPinnedItem.splice(existingItemIndex, 1);
      }

      return {
        ...state,
        pinnedItems: currentPinnedItem,
      };
    }

    case PURGE:
      return initialState;

    default:
      return state;
  }
};
