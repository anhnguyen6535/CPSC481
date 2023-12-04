import {RootState} from '../store';

export const selectPinnedItems = (state: RootState) => state.home.pinnedItems;