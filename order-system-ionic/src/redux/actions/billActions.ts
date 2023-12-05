import { BillActionTypes } from "../actionTypes";

export const orderBill = () => ({
  type: BillActionTypes.ORDER_BILL,
});

export const resetBill = () => ({
  type: BillActionTypes.RESET_BILL,
});

export const addDiner = (name: string) => ({
  type: BillActionTypes.ADD_DINER,
  payload: name,
});

export const removeDiner = (name: string) => ({
  type: BillActionTypes.REMOVE_DINER,
  payload: name,
});
