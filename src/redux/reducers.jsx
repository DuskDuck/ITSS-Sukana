const initialState = {
  filteredData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
