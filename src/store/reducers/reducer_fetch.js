const initialState = {
  data: {
    company: [],
    companyType: []
  },
  options: [],
  searched: null
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
      // console.log('Reducer: ',action.payload);
      return {
        ...state,
        data: {
          company: action.payload.company,
          companyType: action.payload.companyType
        }
      };
    case "SET_OPTIONS":
      // console.log('Reducer: ',action.payload);
      return {
        ...state,
        options: action.payload
      };
    case "SEARCH_RESULTS":
      console.log("Reducer: ", action.payload);
      return {
        ...state,
        searched: action.payload
      };
    case "CLEAR_SEARCH":
      return {
        ...state,
        searched: null
      };
    default:
      return state;
  }
};

export default fetchReducer;
