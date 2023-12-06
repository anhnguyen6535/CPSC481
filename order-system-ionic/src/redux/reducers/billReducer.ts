import { Reducer } from "redux";
import { BillActionTypes, SplitBillActionTypes } from "../actionTypes";
import { PURGE } from "redux-persist";

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

    case SplitBillActionTypes.REMOVE_DINER: {
      const removedDinerId = action.payload;

      const updatedSplitBillDiners = state.splitBillDiners
        .filter((diner) => diner.index !== removedDinerId)
        .map((diner, index) => ({
          ...diner,
          index,
        }));

      const updatedSplitBillItems = state.splitBillItems.map((item) => ({
        ...item,
        selectedPeople: item.selectedPeople
          .filter((diner) => diner.index !== removedDinerId)
          .map((diner, index) => ({
            ...diner,
            index,
          })),
      }));

      const { [removedDinerId]: _, ...remainingSelectedItemsByIndex } =
        state.selectedItemsByIndex;

      const updatedSelectedItemsByIndex = Object.keys(
        remainingSelectedItemsByIndex
      ).reduce((currentSelectedItems, oldIndex) => {
        const oldIndexNumber = Number(oldIndex);
        const newIndex =
          oldIndexNumber > removedDinerId ? oldIndexNumber - 1 : oldIndexNumber;
        return {
          ...currentSelectedItems,
          [newIndex]: remainingSelectedItemsByIndex[oldIndexNumber].map(
            (item: any) => ({
              ...item,
              selectedPeople: item.selectedPeople
                .filter((diner: Diner) => diner.index !== removedDinerId)
                .map((diner: Diner, index: number) => ({ ...diner, index })),
            })
          ),
        };
      }, {});

      return {
        ...state,
        splitBillDiners: updatedSplitBillDiners,
        splitBillItems: updatedSplitBillItems,
        selectedItemsByIndex: updatedSelectedItemsByIndex,
      };
    }

    case SplitBillActionTypes.SELECT_PERSON: {
      const { itemId, diner } = action.payload;

      const dinerIndex = diner.index;
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

      const itemToBeAdded = foundItem
        ? {
            ...foundItem,
            selectedPeople: [...foundItem.selectedPeople, selectedDiner],
          }
        : { itemId: itemId, selectedPeople: [selectedDiner] };

      let updatedSelectedItemsByIndex = { ...state.selectedItemsByIndex };

      if (foundItem) {
        foundItem.selectedPeople.forEach((person) => {
          updatedSelectedItemsByIndex[person.index] =
            updatedSelectedItemsByIndex[person.index].map((item) =>
              item.itemId === itemId ? itemToBeAdded : item
            );
        });
      }

      updatedSelectedItemsByIndex[dinerIndex] = existingItems.some(
        (item) => item.itemId === itemId
      )
        ? existingItems.map((item) =>
            item.itemId === itemId ? itemToBeAdded : item
          )
        : [...existingItems, itemToBeAdded];

      return {
        ...state,
        splitBillItems: state.splitBillItems.some(
          (item) => item.itemId === itemId
        )
          ? state.splitBillItems.map((item) =>
              item.itemId === itemId ? itemToBeAdded : item
            )
          : [...state.splitBillItems, itemToBeAdded],
        selectedItemsByIndex: updatedSelectedItemsByIndex,
      };
    }

    case SplitBillActionTypes.DESELECT_PERSON: {
      const { itemId: targetItemId, diner: targetDiner } = action.payload;

      const targetDinerIndex = targetDiner.index;

      const existingItems = state.selectedItemsByIndex[targetDinerIndex]
        ? [...state.selectedItemsByIndex[targetDinerIndex]]
        : [];

      const filteredExistingItemsForTargetDiner = existingItems.filter(
        (item) => item.itemId !== targetItemId
      );

      const foundItem = state.splitBillItems.find(
        (item) => item.itemId === targetItemId
      );

      if (!foundItem) {
        return state;
      }

      const updatedItem = {
        ...foundItem,
        selectedPeople: foundItem.selectedPeople.filter(
          (diner) => diner.index !== targetDinerIndex
        ),
      };

      let updatedSelectedItemsByIndex = { ...state.selectedItemsByIndex };

      updatedItem.selectedPeople.forEach((person) => {
        updatedSelectedItemsByIndex[person.index] = updatedSelectedItemsByIndex[
          person.index
        ].map((item) => (item.itemId === targetItemId ? updatedItem : item));
      });

      updatedSelectedItemsByIndex[targetDinerIndex] =
        filteredExistingItemsForTargetDiner;

      return {
        ...state,
        splitBillItems: state.splitBillItems.map((item) =>
          item.itemId === targetItemId ? updatedItem : item
        ),
        selectedItemsByIndex: updatedSelectedItemsByIndex,
      };
    }

    case PURGE:
      return initialState;

    default:
      return state;
  }
};

export default billReducer;
