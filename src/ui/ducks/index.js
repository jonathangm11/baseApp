import languages from "./languages";
import orders from './orders';

import {
    combineActions,
    combineReducers,
    combineSelectors
  } from "./utils/reusableFactory";

  export const actions = combineActions({
    languages: languages.actions,
    orders: orders.actions,
  })
  export const selectors = combineSelectors({
    languages: languages.selectors,
    orders: orders.selectors
  })
  const appReducer = combineReducers({
    languages: {reducer:languages.reducer, cache: true},
    orders: {reducer:orders.reducer},
  })
  export const rootReducer = (state, action) => {
    if (action.type === "userPreferences:USERPREF_APPLICATION_CACHE_RESET") {
      console.log("Number of items currently in local storage " + localStorage.length);
      localStorage.clear();
      console.log("Number of items in local storage after cache reset " + localStorage.length);
      state = undefined;     
    }

    return appReducer(state, action);
  };