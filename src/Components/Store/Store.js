import { createStore } from "redux";


const initialState = {
    address: '',
    paymentMethod: '',
    subtotal: 0,
    shipping: 0,
};


const SET_ADDRESS = 'SET_ADDRESS';
const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
const SET_SUBTOTAL = 'SET_SUBTOTAL';
const SET_SHIPPING = 'SET_SHIPPING';


const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            return { ...state, address: action.payload };
        case SET_PAYMENT_METHOD:
            return { ...state, paymentMethod: action.payload };
        case SET_SUBTOTAL:
            return { ...state, subtotal: action.payload };
        case SET_SHIPPING:
            return { ...state, shipping: action.payload };
        default:
            return state;
    }
};


const Store = createStore(checkoutReducer);

export default Store;
