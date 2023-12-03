import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { alcoholDialogReducer } from './alcoholDialogReducer';
import { HomepageReducer } from './homepageReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  alcoholDilaog: alcoholDialogReducer,
  home: HomepageReducer
});

export type AppState = ReturnType<typeof rootReducer>;