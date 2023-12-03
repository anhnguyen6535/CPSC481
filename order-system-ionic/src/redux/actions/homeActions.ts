import { HomePageActionTypes } from "../actionTypes";

export const pinItem = (itemId: number) => ({
  type: HomePageActionTypes.PIN_CARD,
  payload: itemId,
});

export const unpinItem = (itemId: number) => ({
  type: HomePageActionTypes.UNPIN_CARD,
  payload: itemId,
});
