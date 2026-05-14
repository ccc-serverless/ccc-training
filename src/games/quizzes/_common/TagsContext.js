import React, { createContext, useContext, useReducer } from "react";
export const TagsContext = createContext();

const _InitialState = {};
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TAGS":
      let toUpdate = { ...state };
      payload.forEach((tag) => {
        toUpdate[tag._id] = tag.name;
      });
      return toUpdate;
    default:
      return state;
  }
}

export function TagsContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, _InitialState);
  const value = { state, dispatch };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
}

export function useTags() {
  return useContext(TagsContext);
}
