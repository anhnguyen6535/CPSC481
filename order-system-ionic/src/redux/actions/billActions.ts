import { BillActionTypes, SplitBillActionTypes } from "../actionTypes";
import { Diner } from "../reducers/billReducer";

export const orderBill = () => ({
  type: BillActionTypes.ORDER_BILL,
});

export const resetBill = () => ({
  type: BillActionTypes.RESET_BILL,
});

export const addDiner = (name: string, index: number) => ({
  type: SplitBillActionTypes.ADD_DINER,
  payload: { name, index },
});

export const removeDiner = (index: number) => ({
  type: SplitBillActionTypes.REMOVE_DINER,
  payload: index,
});

export const selectPerson = (itemId: number, diner: Diner) => ({
  type: SplitBillActionTypes.SELECT_PERSON,
  payload: { itemId, diner },
});

export const deselectPerson = (itemId: number, diner: Diner) => ({
  type: SplitBillActionTypes.DESELECT_PERSON,
  payload: { itemId, diner },
});
