import languages from "./languages";

import {
    combineActions,
    combineReducers,
    combineSelectors
  } from "./utils/reusableFactory";

  export const actions = combineActions({
    languages: languages.actions
  })
  export const selectors = combineSelectors({
    languages: languages.selectors
  })
  const appReducer = combineReducers({
    languages: {reducer:languages.reducer, cache: true}
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