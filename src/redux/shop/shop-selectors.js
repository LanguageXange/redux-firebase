import { createSelector } from "reselect";
import memoize from "lodash.memoize";
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

// need to memoize entire fn
// Memoize does the same idea of memoization as reselect does for our selectors,
// except this time we're memoizing the return of our function which returns our selector:
export const selectShopItem = memoize((param) =>
  createSelector(selectShopCollections, (collections) =>
    collections.find((collection) => collection.id === map[param])
  )
);
