import { BillActionTypes } from "../actionTypes";

export const orderBill = () => ({
    type: BillActionTypes.ORDER_BILL,
});

export const resetBill = () => ({
    type: BillActionTypes.RESET_BILL,
});