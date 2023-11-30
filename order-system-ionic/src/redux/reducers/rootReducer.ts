import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { alcoholDialogReducer } from './alcoholDialogReducer';

export const rootReducer = combineReducers({
  cart: cartReducer,
  alcoholDilaog: alcoholDialogReducer
});

export type AppState = ReturnType<typeof rootReducer>;