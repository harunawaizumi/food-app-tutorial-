import { useReducer } from 'react';

// 1st element: state snapshot
// 2nd elemnt: function which allows you to displatch an action to the reducer
const [cartState, dispatchCartToAction] = useReducer(cartReducer, defaultCartState);

// difference between useState and useReducer
