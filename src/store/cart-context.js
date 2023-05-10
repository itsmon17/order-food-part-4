import { createContext, useReducer } from "react";
export const CartContext = createContext({
  items: [],
  totalAmount: 0,
});
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const isExist = state.find((item) => item.title === action.payload.title);
    if (!state.length) {
      return [action.payload];
    }
    if (!isExist) {
      return [...state, action.payload];
    }
    const updatedItems = state.map((item) => {
      if (item.title === action.payload.title) {
        return {
          ...item,
          amount: item.amount + action.payload.amount,
        };
      }
      return item;
    });
    return [...updatedItems];
  }
  if (action.type === "INCREMENT") {
    const updatedIncItem = state.map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          amount: item.amount + 1,
        };
      }
      return item;
    });
    return updatedIncItem;
  }
  if (action.type === "DECREMENT") {
    const updatedDecItem = state.map((item) => {
      if (item.id === action.payload && item.amount !== 0) {
        return {
          ...item,
          amount: item.amount - 1,
        };
      }
      return item;
    });
    return updatedDecItem;
  }
  return state;
};
const CardProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);
  console.log(cartState);
  const addItemToCartHandler = (item) => {
    dispatch({ type: "ADD", payload: item });
  };
  const incrementAmount = (id) => {
    dispatch({ type: "INCREMENT", payload: id });
  };
  const decrementAmount = (id) => {
    dispatch({ type: "DECREMENT", payload: id });
  };
  const orderAmount = cartState.reduce(
    (prev, current) => prev + current.amount,
    0
  );
  const getTotalAmount = () => {
    return cartState.reduce(
      (sum, { price, amount }) => sum + amount * price,
      0
    );
  };
  const cartValue = {
    cartItems: cartState,
    totalAmount: orderAmount,
    addItem: addItemToCartHandler,
    incrementAmount,
    decrementAmount,
    getTotalAmount,
  };
  return (
    <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
  );
};

export default CardProvider;
