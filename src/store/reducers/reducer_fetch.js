const initialState = {
  data: {
    company: [],
    companyType: []
  },
  options:[]
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DATA":
    // console.log('Reducer: ',action.payload);
        return{
            ...state,
           data:{
               company:action.payload.company,
               companyType:action.payload.companyType
           }
        }
    case "SET_OPTIONS":
    console.log('Reducer: ',action.payload);
    return{
        ...state,
        options:action.payload
    }
    default:
      return state;
  }
};

export default fetchReducer;
