import React, { createContext, useContext, useReducer } from "react";
export const CartContext = createContext();

const initialState = {
  items: [],
  totalValue: 0,
  isDisplayActive: true,
};

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        totalValue: state.totalValue + payload.price,
      };
    case "REMOVE_ITEM":
      let toUpdate = { ...state };
      let index = toUpdate.items.findIndex((f) => f._id === payload._id);
      if (index >= 0) {
        toUpdate.totalValue = state.totalValue - state.items[index].price;
        toUpdate.items.splice(index, 1);
      }
      return toUpdate;
    case "SHOW_CART":
      return { ...state, isDisplayActive: true };
    case "HIDE_CART":
      return { ...state, isDisplayActive: false };
    case "TOGGLE_CART":
      return { ...state, isDisplayActive: !state.isDisplayActive };
    case "EMPTY_CART":
      return { ...state, items: [], totalValue: 0 };
    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function isExistInCart(id) {
    const found = state.items.find((f) => {
      return f._id === id;
    });

    if (found) return true;
    else return false;
  }

  function refresh() {
    dispatch({ type: "EMPTY_CART" });
    dispatch({ type: "TOGGLE_CART" });
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        refresh,
        isExistInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
