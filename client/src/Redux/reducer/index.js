import { GET_ALL_EVENTS, ERROR, ORDER_BY_NAME, FILTER, GET_NAME_EVENT, GET_EVENT_ID, CREATE_EVENT, GET_ALL_EVENT_LIST, PAY_CRYPTO, PAYMENT_HANDLER } from "../actions";


const initialState = {
    events : [],
    allevents : [],
    eventsToFilter : [],
    error : [],
    post: {},
    filtrado:[],
    payCryptoURL: "",
    dataPago: []
};


function rootReducer (state = initialState, action) {

    switch (action.type) {

        case GET_ALL_EVENTS:
            const events = state.events  
            return {
                ...state,
                // events: events.concat(action.payload) ,
                
                eventsToFilter: action.payload,
                error:[]
            }
        case GET_ALL_EVENT_LIST:
            
            return {
                ...state,
                allevents : action.payload,
                events: action.payload,
            }
        case ERROR:

            return {
                ...state,
                error: action.payload
            }
        case ORDER_BY_NAME:

            return {
                ...state,
                events: action.payload
            }
        case FILTER:

            return {
                ...state,
                filtrado: action.payload,
                // events: action.payload,
                error: []
            }
        
        case GET_NAME_EVENT:
            return {
                ...state,
                events : action.payload
            }
        case GET_EVENT_ID:
            return {
                ...state,
                events : action.payload
            }
        case CREATE_EVENT:
            return {
                ...state,
                post: action.payload
            }         
        case PAY_CRYPTO:
            return{
                ...state,
                payCryptoURL: action.payload
            }    
        case PAYMENT_HANDLER:
            return{
                ...state,
                dataPago: action.payload
            }    
        default:
            
            return {
                ...state
            }
        }
}


export default rootReducer;