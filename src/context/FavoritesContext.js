import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (user) => {
    setFavorites((prevFavorites) => [...prevFavorites, user]);
  };

  const removeFavorite = (userId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.id !== userId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
