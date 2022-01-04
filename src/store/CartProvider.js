import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};
// want to stick outside of the component
const cartReducer = (state, action) => {

  console.log(`(cartReducer) State is`, state);
  console.log(`(cardReducer) Action is`, action);

  if (action.type =='ADD')
  {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if(existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  return defaultCartState;
};

const CartProvider = props => {
  // cardReducer is the function to update the state
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    console.log(`(addItemToCartHandler) called with item: `, item)
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    console.log(`removeItemFromCartHandler: `, id)
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}

export default CartProvider;
