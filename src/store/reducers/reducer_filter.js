const initialState={
    isActiv: true,
    initFilter:false,
    companyType: "",
    search: '',
}

const filterReducer=(state=initialState,action)=>{
    // console.log('Reducer: ',state)
    switch(action.type){
        case 'ISCHECKED':
        return{
            ...state,
            isActiv:state.isActiv?false:true,
            initFilter:true
        }
        case 'SELECT':
        return{
            ...state,
            companyType:action.payload,
            initFilter:true
        }
        case 'INPUT':
        return{
            ...state,
            initFilter:false,
            companyType: "",
            search:action.payload

        }
        default:
        return state;
    }
}

export default filterReducer;