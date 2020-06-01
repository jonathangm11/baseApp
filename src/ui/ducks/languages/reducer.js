import types from './types';

const INIT_STATE = {
  loading: false,
  language: 'en',
  data: [],
  error: {},
  selectedData: [],
};

export default (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case types.LANGUAGES_LIST: {
      return {
        ...state,
        loading: true,
        error: {}
      };
    }
    case types.LANGUAGES_LIST_SUCCESS: {
      const data = JSON.parse(action.result);
      return {
        ...state,
        loading: false,
        error: {},
        data: data.data
      };
    }
    case types.LANGUAGES_LIST_FAILURE: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        error
      };
    }
    case types.SET_LANGUAGE: {
      const { language } = action;      
      let selectedData = state.data.filter((l) => l.lenaguaje === language).map((l) => l.words)[0];
      return {
        ...state,
        selectedData: selectedData,
        language:language
      };
    }
    default: {
      return state;
    }
  }
};
