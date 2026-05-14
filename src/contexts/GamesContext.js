import React, { useEffect, createContext, useContext, useReducer } from "react";
import { getRequest } from "utils/api";

export const GamesContext = createContext();

const initialState = { games: [] };
function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_GAMES":
      return { ...state, games: payload };
    default:
      return state;
  }
}

export function GamesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function getGames() {
    getRequest("/game/games")
      .then((resp) => {
        dispatch({ type: "SET_GAMES", payload: resp.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getGames();
  }, []);

  const value = { state, dispatch };
  return <GamesContext.Provider value={value}>{children}</GamesContext.Provider>;
}

export function useGames() {
  return useContext(GamesContext);
}
