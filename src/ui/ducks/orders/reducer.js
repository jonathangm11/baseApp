const INIT_STATE = {
    dropdownData: [],
    filterBarData: []
};

export default (state = INIT_STATE, action={}) => {
  switch (action.type) {
    
    case "SET_SEARCH_DROPDOWN_DATA": {
      console.log("testset",action.payload);
      return {
        ...state,
        dropdownData: state.dropdownData.concat(action.payload)
      };
    }
    case "CLEAR_SEARCH_DROPDOWN_DATA": {
      return {
        ...state,
        dropdownData: state.dropdownData.length === 0? [] : state.dropdownData.filter((option) => option.type !== action.payload),
      };
    }
    case "SET_SEARCH_FILTER_BAR_DATA": {
      return {
        ...state,
        filterBarData: action.payload
      };
    }
    case "CLEAR_SEARCH_FILTER_BAR_DATA": {
      return {
        ...state,
        filterBarData: state.filterBarData.length === 0? [] : state.filterBarData.filter((option) => option.type !== action.payload),
      };
    }
    case "CLEAR_ALL_SEARCH_FILTER_BAR_DATA":{
      return{
        ...state,
        filterBarData:[],
      }
    }
    default: {
      return state;
    }
  }
};
