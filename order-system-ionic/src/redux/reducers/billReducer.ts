import { Reducer } from "redux";
import { BillActionTypes } from "../actionTypes";

interface BillState {
  billOrdered: boolean;
  splitBillDiners: string[];
}

const initialState: BillState = {
  billOrdered: false,
  splitBillDiners: [],
};

const billReducer: Reducer<BillState> = (state = initialState, action) => {
  switch (action.type) {
    case BillActionTypes.ORDER_BILL:
      return {
        ...state,
        billOrdered: true,
      };

    case BillActionTypes.RESET_BILL:
      return {
        ...state,
        billOrdered: false,
      };

    case BillActionTypes.ADD_DINER:
      return {
        ...state,
        splitBillDiners: [...state.splitBillDiners, action.payload],
      };

    case BillActionTypes.REMOVE_DINER:
      return {
        ...state,
        splitBillDiners: state.splitBillDiners.filter(
          (diner) => diner !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default billReducer;
