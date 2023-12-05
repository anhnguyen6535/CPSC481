import { Reducer } from "redux";
import { BillActionTypes, SplitBillActionTypes } from "../actionTypes";

export interface PersonOrder {
  personName: string;
  selectedItems: SplitBillItem[];
}

interface BillState {
  billOrdered: boolean;
  splitBillItems: SplitBillItem[];
  splitBillDiners: string[];
}

interface SplitBillItem {
  itemId: number;
  selectedPeople: string[];
}

const initialState: BillState = {
  billOrdered: false,
  splitBillItems: [],
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

    case SplitBillActionTypes.ADD_DINER:
      return {
        ...state,
        splitBillDiners: [...state.splitBillDiners, action.payload],
      };

    case SplitBillActionTypes.REMOVE_DINER:
      return {
        ...state,
        splitBillDiners: state.splitBillDiners.filter(
          (diner) => diner !== action.payload
        ),
      };

    case SplitBillActionTypes.SELECT_PERSON:
      const { itemId, personName } = action.payload;
      return {
        ...state,
        splitBillItems: state.splitBillItems.map((item) =>
          item.itemId === itemId
            ? { ...item, selectedPeople: [...item.selectedPeople, personName] }
            : item
        ),
      };

    case SplitBillActionTypes.DESELECT_PERSON:
      return {
        ...state,
        splitBillItems: state.splitBillItems.map((item) => ({
          ...item,
          selectedPeople: item.selectedPeople.filter(
            (diner) => diner !== action.payload
          ),
        })),
      };

    default:
      return state;
  }
};

export default billReducer;
