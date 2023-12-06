import { Reducer } from "redux";
import { BillActionTypes, SplitBillActionTypes } from "../actionTypes";

export interface PersonOrder {
  personName: string;
  selectedItems: SplitBillItem[];
}

interface BillState {
  billOrdered: boolean;
  splitBillItems: SplitBillItem[];
  splitBillDiners: Diner[];
  selectedItemsByIndex: Record<number, SplitBillItem[]>;
}

interface SplitBillItem {
  itemId: number;
  selectedPeople: Diner[];
}

export interface Diner {
  index: number;
  name: string;
}

const initialState: BillState = {
  billOrdered: false,
  splitBillItems: [],
  splitBillDiners: [],
  selectedItemsByIndex: {},
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
      const newDiner = {
        index: action.payload.index,
        name: action.payload.name,
      };

      return {
        ...state,
        splitBillDiners: state.splitBillDiners.some(
          (diner) => diner.index === action.payload.index
        )
          ? state.splitBillDiners.map((diner) =>
              diner.index === action.payload.index ? newDiner : diner
            )
          : [...state.splitBillDiners, newDiner],
      };

    case SplitBillActionTypes.REMOVE_DINER:
      return {
        ...state,
        splitBillDiners: state.splitBillDiners.filter(
          (diner) => diner.index !== action.payload
        ),
      };

    case SplitBillActionTypes.SELECT_PERSON: {
      const { itemId, dinerIndex } = action.payload;
      const selectedDiner = state.splitBillDiners.find(
        (diner) => diner.index === dinerIndex
      );

      if (!selectedDiner) {
        return state;
      }

      const foundItem = state.splitBillItems.find(
        (item) => item.itemId === itemId
      );
      const existingItems = state.selectedItemsByIndex[dinerIndex]
        ? [...state.selectedItemsByIndex[dinerIndex]]
        : [];

      return {
        ...state,
        splitBillItems: state.splitBillItems.map((item) =>
          item.itemId === itemId
            ? {
                ...item,
                selectedPeople: [...item.selectedPeople, selectedDiner],
              }
            : item
        ),
        selectedItemsByIndex: {
          ...state.selectedItemsByIndex,
          [dinerIndex]: foundItem
            ? [...existingItems, foundItem]
            : existingItems,
        },
      };
    }

    case SplitBillActionTypes.DESELECT_PERSON: {
      const { itemId: targetItemId, dinerIndex: targetDinerIndex } =
        action.payload;

      const existingItems = state.selectedItemsByIndex[targetDinerIndex]
        ? [...state.selectedItemsByIndex[targetDinerIndex]]
        : [];

      return {
        ...state,
        splitBillItems: state.splitBillItems.map((item) =>
          item.itemId === targetItemId
            ? {
                ...item,
                selectedPeople: item.selectedPeople.filter(
                  (diner) => diner.index !== targetDinerIndex
                ),
              }
            : item
        ),
        selectedItemsByIndex: {
          ...state.selectedItemsByIndex,
          [targetDinerIndex]: existingItems.filter(
            (item) => item.itemId !== targetItemId
          ),
        },
      };
    }

    default:
      return state;
  }
};

export default billReducer;
