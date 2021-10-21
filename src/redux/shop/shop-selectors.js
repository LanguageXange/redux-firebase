import { createSelector } from "reselect";

const selectShop = (state) => state.myshop;

// create mapping string to id map -> temporary solution - this map will be removed after moving data to firebase
const map = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5,
};
export const selectShopCollections = createSelector(
  selectShop,
  (s) => s.collections
);

export const selectShopItem = (param) =>
  createSelector(selectShopCollections, (collections) =>
    collections.find((collection) => collection.id === map[param])
  );
